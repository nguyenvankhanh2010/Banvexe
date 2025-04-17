package com.example.bookingTicket.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookingTicket.dto.SeatDTO;
import com.example.bookingTicket.enums.EPaymentMethod;
import com.example.bookingTicket.enums.EPaymentStatus;
import com.example.bookingTicket.enums.ESeatStatus;
import com.example.bookingTicket.enums.ETicketStatus;
import com.example.bookingTicket.models.BookingHistory;
import com.example.bookingTicket.models.Customer;
import com.example.bookingTicket.models.Payment;
import com.example.bookingTicket.models.Seat;
import com.example.bookingTicket.models.Ticket;
import com.example.bookingTicket.repositories.PaymentRepository;
import com.example.bookingTicket.repositories.SeatRepository;
import com.example.bookingTicket.repositories.TicketRepository;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    public TicketRepository ticketRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingHistoryService bookingHistoryService;

    @Autowired
    private CustomerService customerService;

    private SeatDTO convertToDTO(Seat seat) {
        SeatDTO dto = new SeatDTO();
        dto.setId(seat.getId());
        dto.setSeatNumber(seat.getSeatNumber());
        dto.setStatus(seat.getStatus());
        if (seat.getBus() != null) {
            dto.setBusId(seat.getBus().getId());
            dto.setBusNumber(seat.getBus().getBusNumber());
        }
        return dto;
    }

    // Lấy danh sách ghế khả dụng
    public List<SeatDTO> getAvailableSeats() {
        return seatRepository.findByStatus(ESeatStatus.AVAILABLE)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Kiểm tra ghế có khả dụng không
    public boolean checkSeatAvailability(Long seatId) {
        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new RuntimeException("Seat not found"));
        return seat.getStatus() == ESeatStatus.AVAILABLE;
    }

    // Đặt vé
    public Ticket bookTicket(Long seatId, String customerId, double cost) {
        if (!checkSeatAvailability(seatId)) {
            throw new RuntimeException("Seat is not available");
        }

        Seat seat = seatRepository.findById(seatId).get();
        
        Customer customer = customerService.findById(Long.parseLong(customerId));

        Ticket ticket = new Ticket();
        ticket.setBookingCode(UUID.randomUUID().toString());
        ticket.setBookingDateTime(LocalDateTime.now());
        ticket.setCost(cost);
        ticket.setSeat(seat);
        ticket.setCustomer(customer);
        ticket.setStatus(ETicketStatus.WAITING);

        return ticketRepository.save(ticket);
    }

    // Chuẩn bị thông tin thanh toán
    public Payment preparePayment(Ticket ticket, EPaymentMethod paymentMethod) {
        // Create new booking history
        BookingHistory bookingHistory = new BookingHistory();
        bookingHistory.setSeat(ticket.getSeat());
        bookingHistory.setCustomer(ticket.getCustomer());
        bookingHistory.setBookingTime(ticket.getBookingDateTime());
        BookingHistory savedHistory = bookingHistoryService.save(bookingHistory);

        // Create payment
        Payment payment = new Payment();
        payment.setAmount(Long.valueOf((long)ticket.getCost()));
        payment.setPaymentTime(LocalDateTime.now());
        payment.setStatus(paymentMethod == EPaymentMethod.BY_CASH ? EPaymentStatus.WAITING_CASH : EPaymentStatus.WAITING_TRANSFER);
        payment.setMethod(paymentMethod);
        payment.setBookingHistory(savedHistory);
        return paymentRepository.save(payment);
    }

    // Xử lý thanh toán
    public Payment processPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        // Update payment status first
        payment.setStatus(EPaymentStatus.SUCCEEDED);
        payment = paymentRepository.save(payment);

        // After successful payment, update seat status to BOOKED
        BookingHistory bookingHistory = payment.getBookingHistory();
        Seat seat = bookingHistory.getSeat();
        seat.setStatus(ESeatStatus.BOOKED);
        seatRepository.save(seat);

        return payment;
    }

    // Lấy danh sách ghế theo tripId
    public List<SeatDTO> getSeatsByTripId(Long tripId) {
        return seatRepository.findByBusTripId(tripId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Seat getSeatById(Long id) {
        return seatRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Seat not found with id: " + id));
    }

    public Seat updateSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    public List<Seat> getSeatsByTripId(String tripId) {
        return seatRepository.findByBus_Trip_TripId(tripId);
    }
}