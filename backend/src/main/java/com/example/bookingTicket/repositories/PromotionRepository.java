package com.example.bookingTicket.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    
}
