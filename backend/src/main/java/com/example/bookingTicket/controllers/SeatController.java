package com.example.bookingTicket.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookingTicket.dto.SeatDTO;
import com.example.bookingTicket.dto.StatusUpdateRequest;
import com.example.bookingTicket.enums.ESeatStatus;
import com.example.bookingTicket.models.Seat;
import com.example.bookingTicket.responses.ErrorResponse;
import com.example.bookingTicket.responses.SuccessResponse;
import com.example.bookingTicket.services.SeatService;

@RestController
@RequestMapping("/api/seats")
public class SeatController {
    @Autowired
    private SeatService seatService;

    // GET /api/seats/available: Lấy danh sách ghế khả dụng
    @GetMapping("/available")
    public ResponseEntity<List<SeatDTO>> getAvailableSeats() {
        List<SeatDTO> availableSeats = seatService.getAvailableSeats();
        return ResponseEntity.ok(availableSeats);
    }

    // GET /api/seats/check/{id}: Kiểm tra ghế có khả dụng không
    @GetMapping("/check/{id}")
    public ResponseEntity<Map<String, Object>> checkSeatAvailability(@PathVariable Long id) {
        try {
            Seat seat = seatService.getSeatById(id);
            
            // Create response with seat details
            Map<String, Object> response = new HashMap<>();
            response.put("available", seat.getStatus() == ESeatStatus.AVAILABLE);
            
            // Add seat details to response
            Map<String, Object> seatDetails = new HashMap<>();
            seatDetails.put("id", seat.getId());
            seatDetails.put("seatNumber", seat.getSeatNumber());
            seatDetails.put("status", seat.getStatus());
            seatDetails.put("busId", seat.getBus().getId());
            response.put("seat", seatDetails);
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("available", false);
            errorResponse.put("error", "Không tìm thấy ghế với ID: " + id);
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    // GET /api/seats/trip/{tripId}: Lấy danh sách ghế theo chuyến xe
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<SeatDTO>> getSeatsByTrip(@PathVariable Long tripId) {
        List<SeatDTO> seats = seatService.getSeatsByTripId(tripId);
        return ResponseEntity.ok(seats);
    }
    
    /**
     * Update the status of a seat
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateSeatStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {
        try {
            System.out.println("Updating seat status for ID: " + id + " to: " + request.getStatus());
            
            Seat seat = seatService.getSeatById(id);
            
            // Update seat status
            ESeatStatus newStatus;
            try {
                newStatus = ESeatStatus.valueOf(request.getStatus());
            } catch (IllegalArgumentException e) {
                System.err.println("Invalid status: " + request.getStatus());
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Invalid Status", "Trạng thái không hợp lệ: " + request.getStatus()));
            }
            
            seat.setStatus(newStatus);
            seatService.updateSeat(seat);
            
            System.out.println("Seat status updated successfully");
            return ResponseEntity.ok(new SuccessResponse("Success", "Cập nhật trạng thái ghế thành công"));
        } catch (Exception e) {
            System.err.println("Error updating seat status: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("Error", "Lỗi khi cập nhật trạng thái ghế: " + e.getMessage()));
        }
    }
} 