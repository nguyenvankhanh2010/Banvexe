package com.example.bookingTicket.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportID;

    // Methods
    public double callList(LocalDateTime start, LocalDateTime end, List<Ticket> tickets) {
        return 0.0;
    }
}
