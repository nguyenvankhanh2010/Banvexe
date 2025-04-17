package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookingTicket.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
