package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.Bus;

public interface BusRepository extends JpaRepository<Bus, Long> {

}
