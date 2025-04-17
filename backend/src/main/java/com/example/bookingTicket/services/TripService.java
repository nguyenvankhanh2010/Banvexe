package com.example.bookingTicket.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookingTicket.dto.BusDTO;
import com.example.bookingTicket.dto.TripDTO;
import com.example.bookingTicket.models.Trip;
import com.example.bookingTicket.repositories.TripRepository;

@Service
public class TripService {
    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private SeatService seatService;

    // Lấy danh sách chuyến đi với bộ lọc
    public List<TripDTO> getTrips(String origin, String destination, LocalDateTime date) {
        List<Trip> trips;
        if (origin != null && destination != null && date != null) {
            trips = tripRepository.findTripsByFilters(origin, destination, date);
        } else {
            trips = tripRepository.findAll();
        }
        return trips.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TripDTO convertToDTO(Trip trip) {
        TripDTO dto = new TripDTO();
        dto.setId(trip.getId());
        dto.setTripId(trip.getTripId());
        dto.setOrigin(trip.getOrigin());
        dto.setDestination(trip.getDestination());
        dto.setDepartureTime(trip.getDepartureTime());
        dto.setArrivalTime(trip.getArrivalTime());
        dto.setBusType(trip.getBusType());
        dto.setPrice(trip.getPrice());
        dto.setAvailableSeats(trip.getAvailableSeats());

        if (trip.getBus() != null) {
            BusDTO busDTO = new BusDTO();
            busDTO.setId(trip.getBus().getId());
            busDTO.setBusNumber(trip.getBus().getBusNumber());
            busDTO.setBusType(trip.getBus().getBusType());
            busDTO.setTotalSeats(trip.getBus().getTotalSeats());
            dto.setBus(busDTO);
        }

        return dto;
    }

    // Lấy chi tiết chuyến đi theo tripId
    public TripDTO getTripByTripId(String tripId) {
        Trip trip = tripRepository.findByTripId(tripId);
        if (trip == null) {
            throw new RuntimeException("Trip not found with tripId: " + tripId);
        }
        return convertToDTO(trip);
    }

    // Lấy chi tiết chuyến đi theo id
    public Trip getTripById(Long id) {
        return tripRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));
    }

    // Tạo chuyến đi mới (dùng để thêm dữ liệu mẫu)
    public Trip createTrip(Trip trip) {
        trip.setTripId(UUID.randomUUID().toString());
        return tripRepository.save(trip);
    }

    public Trip findById(Long id) {
        return tripRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));
    }
}