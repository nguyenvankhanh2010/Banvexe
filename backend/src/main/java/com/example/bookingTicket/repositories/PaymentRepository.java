package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.BookingHistory;
import com.example.bookingTicket.models.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByBookingHistory(BookingHistory bookingHistory);
}