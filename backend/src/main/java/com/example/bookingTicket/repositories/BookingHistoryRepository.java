package com.example.bookingTicket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.bookingTicket.models.BookingHistory;
import com.example.bookingTicket.models.Seat;

@Repository
public interface BookingHistoryRepository extends JpaRepository<BookingHistory, Long> {
    BookingHistory findBySeat(Seat seat);
    
    @Query("SELECT b FROM BookingHistory b WHERE b.customer.id = :customerId")
    List<BookingHistory> findByCustomerId(@Param("customerId") Long customerId);
}
