package com.example.bookingTicket.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.Report;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    
}
