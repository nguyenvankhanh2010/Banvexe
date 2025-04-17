package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.Staff;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    
}
