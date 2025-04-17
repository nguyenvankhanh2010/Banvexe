package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.BankTransfer;

public interface BankTransferRepository extends JpaRepository<BankTransfer, Integer> {
    
}
