package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.ContentAndPolicies;

public interface ContentAndPoliciesRepository extends JpaRepository<ContentAndPolicies, Integer> {
    
}
