package com.example.bookingTicket.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.bookingTicket.dto.SeatDTO;
import com.example.bookingTicket.dto.TripDTO;
import com.example.bookingTicket.models.Trip;
import com.example.bookingTicket.services.SeatService;
import com.example.bookingTicket.services.TripService;

@RestController
@RequestMapping("/api")
public class TripController {
    @Autowired
    private TripService tripService;

    @Autowired
    private SeatService seatService;

    // GET /api/trips: Lấy danh sách chuyến đi với bộ lọc
    @GetMapping("/trips")
    public ResponseEntity<List<TripDTO>> getTrips(
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String date) {
        LocalDateTime parsedDate = null;
        if (date != null) {
            parsedDate = LocalDateTime.parse(date, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }
        List<TripDTO> trips = tripService.getTrips(origin, destination, parsedDate);
        return ResponseEntity.ok(trips);
    }

    // GET /api/trips/{idOrTripId}: Lấy chi tiết chuyến đi
    @GetMapping("/trips/{idOrTripId}")
    public ResponseEntity<TripDTO> getTripDetails(@PathVariable String idOrTripId) {
        try {
            TripDTO tripDTO;
            try {
                Long id = Long.parseLong(idOrTripId);
                Trip trip = tripService.getTripById(id);
                tripDTO = tripService.convertToDTO(trip);
            } catch (NumberFormatException e) {
                // Nếu không phải số, xem như là tripId
                tripDTO = tripService.getTripByTripId(idOrTripId);
            }
            return ResponseEntity.ok(tripDTO);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    // GET /api/trips/{tripId}/seats: Lấy danh sách ghế của một chuyến xe
    @GetMapping("/trips/{tripId}/seats")
    public ResponseEntity<List<SeatDTO>> getSeatsByTripId(@PathVariable Long tripId) {
        try {
            List<SeatDTO> seats = seatService.getSeatsByTripId(tripId);
            return ResponseEntity.ok(seats);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Seats not found for trip: " + tripId, e);
        }
    }
}