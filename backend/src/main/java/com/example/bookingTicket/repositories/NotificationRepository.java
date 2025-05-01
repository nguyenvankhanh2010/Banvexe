package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.bookingTicket.models.Notification;

public interface NotificationRepository  extends JpaRepository<Notification, Integer> 
{
    
}
