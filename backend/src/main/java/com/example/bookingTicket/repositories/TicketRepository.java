package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookingTicket.models.Seat;
import com.example.bookingTicket.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Ticket findByBookingCode(String bookingCode);
    Ticket findBySeat(Seat seat);
}