package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.Cash;

public interface CashRepository extends JpaRepository<Cash, Integer> {
    
}
