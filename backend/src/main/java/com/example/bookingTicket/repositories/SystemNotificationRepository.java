package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.models.SystemNotification;

public interface SystemNotificationRepository extends JpaRepository<SystemNotification, String> {
    
}
