package com.example.bookingTicket.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookingTicket.dto.BookingHistoryDTO;
import com.example.bookingTicket.dto.BookingRequest;
import com.example.bookingTicket.dto.BookingResponse;
import com.example.bookingTicket.enums.ESeatStatus;
import com.example.bookingTicket.enums.ETicketStatus;
import com.example.bookingTicket.models.BookingHistory;
import com.example.bookingTicket.models.Customer;
import com.example.bookingTicket.models.Seat;
import com.example.bookingTicket.models.Ticket;
import com.example.bookingTicket.models.Trip;
import com.example.bookingTicket.responses.ErrorResponse;
import com.example.bookingTicket.responses.SuccessResponse;
import com.example.bookingTicket.services.BookingHistoryService;
import com.example.bookingTicket.services.CustomerService;
import com.example.bookingTicket.services.SeatService;
import com.example.bookingTicket.services.TicketService;
import com.example.bookingTicket.services.TripService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingHistoryService bookingHistoryService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private SeatService seatService;

    @Autowired
    private TripService tripService;

    @Autowired
    private TicketService ticketService;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getBookingsByCustomer(
            @PathVariable Long customerId,
            @RequestHeader(value = "X-User-ID", required = false) String userIdHeader) {
        try {
            // Nếu có header X-User-ID, ưu tiên sử dụng nó
            if (userIdHeader != null && !userIdHeader.isEmpty()) {
                try {
                    Long headerUserId = Long.parseLong(userIdHeader);
                    if (!headerUserId.equals(customerId)) {
                        System.out.println("Overriding URL customerId " + customerId + 
                                           " with header X-User-ID: " + headerUserId);
                        customerId = headerUserId;
                    }
                } catch (NumberFormatException e) {
                    System.err.println("Invalid X-User-ID header: " + userIdHeader);
                }
            }
            
            System.out.println("Fetching bookings for customer ID: " + customerId);
            
            // Validate customer exists
            Customer customer = customerService.findById(customerId);
            if (customer == null) {
                System.err.println("Customer not found with ID: " + customerId);
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Not Found", "Không tìm thấy thông tin khách hàng"));
            }
            
            // Get bookings and convert to DTOs
            List<BookingHistory> bookings = bookingHistoryService.findByCustomerId(customerId);
            System.out.println("Found " + bookings.size() + " bookings for customer");
            
            List<BookingHistoryDTO> bookingDTOs = bookings.stream()
                .map(booking -> {
                    try {
                        return new BookingHistoryDTO(booking);
                    } catch (Exception e) {
                        System.err.println("Error converting booking to DTO: " + e.getMessage());
                        return null;
                    }
                })
                .filter(dto -> dto != null)
                .collect(Collectors.toList());
            
            System.out.println("Converted " + bookingDTOs.size() + " bookings to DTOs");
            return ResponseEntity.ok(bookingDTOs);
            
        } catch (Exception e) {
            System.err.println("Error fetching bookings: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                .body(new ErrorResponse("Error", "Không thể lấy lịch sử đặt vé: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody BookingRequest request, 
            HttpServletRequest servletRequest,
            @RequestHeader(value = "X-User-ID", required = false) String userIdHeader) {
        try {
            System.out.println("Received booking request: " + request);
            
            // Lấy userId từ session
            HttpSession session = servletRequest.getSession(false);
            Long customerId = 3L; // Mặc định là 3 nếu không có session
            
            // Thử lấy userId từ session
            if (session != null && session.getAttribute("userId") != null) {
                try {
                    customerId = Long.parseLong(session.getAttribute("userId").toString());
                    System.out.println("Using customerId from session: " + customerId);
                } catch (NumberFormatException e) {
                    System.err.println("Error parsing customerId from session: " + e.getMessage());
                }
            } else {
                System.out.println("No session found or userId not in session, checking header");
                
                // Nếu không có session, thử lấy từ header
                if (userIdHeader != null && !userIdHeader.isEmpty()) {
                    try {
                        customerId = Long.parseLong(userIdHeader);
                        System.out.println("Using customerId from header: " + customerId);
                    } catch (NumberFormatException e) {
                        System.err.println("Error parsing customerId from header: " + e.getMessage());
                        System.out.println("Using default customerId: " + customerId);
                    }
                } else {
                    System.out.println("No userId header found, using default customerId: " + customerId);
                }
            }

            // Validate request
            if (request.getSeatId() == null || request.getTripId() == null) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Validation Error", "Thiếu thông tin ghế hoặc chuyến xe"));
            }

            // Get seat and check availability
            Seat seat = seatService.getSeatById(request.getSeatId());
            if (seat == null) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Not Found", "Không tìm thấy ghế với ID: " + request.getSeatId()));
            }

            if (seat.getStatus() != ESeatStatus.AVAILABLE) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Invalid Status", "Ghế này đã được đặt. Vui lòng chọn ghế khác."));
            }

            // Get trip
            Trip trip = tripService.getTripById(request.getTripId());
            if (trip == null) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Not Found", "Không tìm thấy chuyến xe với ID: " + request.getTripId()));
            }

            // Get customer
            Customer customer = customerService.findById(customerId);
            if (customer == null) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Not Found", "Không tìm thấy thông tin khách hàng với ID: " + customerId));
            }
            
            // Update seat status first
            seat.setStatus(ESeatStatus.BOOKED);
            seat = seatService.updateSeat(seat); // Save and get updated seat
            
            // Create ticket
            Ticket ticket = new Ticket();
            ticket.setBookingCode(UUID.randomUUID().toString());
            ticket.setBookingDateTime(LocalDateTime.now());
            ticket.setCost(trip.getPrice()); // Use trip price as cost
            ticket.setSeat(seat);
            ticket.setCustomer(customer);
            ticket.setTrip(trip);
            ticket.setStatus(ETicketStatus.WAITING);
            Ticket savedTicket = ticketService.save(ticket);
            
            // Create booking history
            BookingHistory bookingHistory = new BookingHistory();
            bookingHistory.setCustomer(customer);
            bookingHistory.setSeat(seat);
            bookingHistory.setTrip(trip);
            bookingHistory.setBookingTime(LocalDateTime.now());
            bookingHistory.setPassengerName(request.getPassengerName());
            bookingHistory.setPassengerPhone(request.getPassengerPhone());
            bookingHistory.setPassengerEmail(request.getPassengerEmail());
            bookingHistory.setStatus(ETicketStatus.WAITING); // Set initial status
            
            // Save booking history
            BookingHistory savedBooking = bookingHistoryService.save(bookingHistory);
            
            // Create response DTO
            BookingResponse response = new BookingResponse(
                savedBooking.getId(),
                savedBooking.getPassengerName(),
                savedBooking.getPassengerPhone(),
                savedBooking.getPassengerEmail(),
                seat.getSeatNumber(),
                String.format("%s - %s (%s)", 
                    trip.getOrigin(), 
                    trip.getDestination(),
                    trip.getDepartureTime().format(formatter)),
                savedBooking.getBookingTime().format(formatter)
            );
            
            return ResponseEntity.ok(new SuccessResponse("Đặt vé thành công", response));
        } catch (Exception e) {
            System.err.println("Error creating booking: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("System Error", "Không thể đặt vé: " + e.getMessage()));
        }
    }

    /**
     * Cancel a booking and its related ticket and seat
     */
    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-ID", required = false) String userIdHeader,
            HttpServletRequest servletRequest) {
        try {
            System.out.println("Cancelling booking with ID: " + id);
            
            // Lấy userId từ session hoặc header
            HttpSession session = servletRequest.getSession(false);
            Long userId = null;
            
            if (session != null && session.getAttribute("userId") != null) {
                try {
                    userId = Long.parseLong(session.getAttribute("userId").toString());
                    System.out.println("Using userId from session: " + userId);
                } catch (NumberFormatException e) {
                    System.err.println("Error parsing userId from session: " + e.getMessage());
                }
            } else if (userIdHeader != null && !userIdHeader.isEmpty()) {
                try {
                    userId = Long.parseLong(userIdHeader);
                    System.out.println("Using userId from header: " + userId);
                } catch (NumberFormatException e) {
                    System.err.println("Error parsing userId from header: " + e.getMessage());
                }
            }
            
            // Find booking history
            BookingHistory bookingHistory = bookingHistoryService.findById(id);
            if (bookingHistory == null) {
                System.err.println("Booking not found with ID: " + id);
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Not Found", "Không tìm thấy đặt vé với ID: " + id));
            }
            
            // Kiểm tra xem booking có thuộc về user không
            if (userId != null && !bookingHistory.getCustomer().getId().equals(userId)) {
                System.err.println("User " + userId + " attempted to cancel booking " + id + 
                                   " owned by user " + bookingHistory.getCustomer().getId());
                return ResponseEntity.status(403)
                    .body(new ErrorResponse("Forbidden", "Bạn không có quyền hủy vé này"));
            }
            
            // Update booking status to CANCELED
            bookingHistory.setStatus(ETicketStatus.CANCELED);
            bookingHistoryService.save(bookingHistory);
            System.out.println("Booking history updated to CANCELED");
            
            // Update seat status to AVAILABLE
            Seat seat = bookingHistory.getSeat();
            if (seat != null) {
                seat.setStatus(ESeatStatus.AVAILABLE);
                seatService.updateSeat(seat);
                System.out.println("Seat " + seat.getSeatNumber() + " updated to AVAILABLE");
            } else {
                System.err.println("No seat found for booking: " + id);
            }
            
            // Find and update ticket status if exists
            Ticket ticket = ticketService.findBySeat(seat);
            if (ticket != null) {
                ticket.setStatus(ETicketStatus.CANCELED);
                ticketService.save(ticket);
                System.out.println("Ticket updated to CANCELED");
            } else {
                System.err.println("No ticket found for booking: " + id);
            }
            
            System.out.println("Booking cancelled successfully");
            return ResponseEntity.ok(new SuccessResponse("Success", "Hủy đặt vé thành công"));
        } catch (Exception e) {
            System.err.println("Error cancelling booking: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                .body(new ErrorResponse("Error", "Lỗi khi hủy đặt vé: " + e.getMessage()));
        }
    }
}