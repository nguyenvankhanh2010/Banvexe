package com.example.bookingTicket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.bookingTicket.dto.TicketInfoDTO;
import com.example.bookingTicket.dto.TicketInfoProjection;
import com.example.bookingTicket.models.Seat;
import com.example.bookingTicket.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Ticket findByBookingCode(String bookingCode);
    Ticket findBySeat(Seat seat);

    @Query(value = """
    SELECT 
        t.booking_code AS bookingCode,
        u.name AS customerName,
        u.phone AS phone,
        CONCAT(tr.origin, ' - ', tr.destination) AS route,
        tr.arrival_time AS arrivalTime,
        s.seat_number AS seatNumber,
        t.status AS ticketStatus,
        p.status AS paymentStatus
    FROM ticket t
    JOIN seat s ON s.id = t.seat_id
    JOIN trip tr ON tr.id = t.trip_id
    JOIN users u ON u.id = t.customer_id
    JOIN booking_histories h ON h.seat_id = s.id AND h.trip_id = tr.id
    JOIN payments p ON p.booking_history_id = h.id
""", nativeQuery = true)
List<TicketInfoProjection> getAllTicketInfo();
}