package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.SupportRequest;

public interface SupportRequestRepository extends JpaRepository<SupportRequest, Integer> {
    
}
