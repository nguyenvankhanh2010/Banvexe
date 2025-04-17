package com.example.bookingTicket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.bookingTicket.enums.ESeatStatus;
import com.example.bookingTicket.models.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByStatus(ESeatStatus status);
    
    @Query("SELECT s FROM Seat s WHERE s.bus.trip.id = :tripId")
    List<Seat> findByBusTripId(@Param("tripId") Long tripId);

    List<Seat> findByBus_Trip_TripId(String tripId);
}