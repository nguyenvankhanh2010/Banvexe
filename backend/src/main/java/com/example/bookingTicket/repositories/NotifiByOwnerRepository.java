package com.example.bookingTicket.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.NotifiByOwner;

public interface NotifiByOwnerRepository  extends JpaRepository<NotifiByOwner, Integer> {
    Optional<NotifiByOwner> findByNotifiId(String notifiId);

    // Custom query methods can be defined here if needed
    // For example, to find notifications by sender or other criteria
    
}
