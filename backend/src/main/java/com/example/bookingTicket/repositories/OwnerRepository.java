package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Integer> {
    
}
