package com.example.bookingTicket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookingTicket.models.NotifiBySystem;
import com.example.bookingTicket.models.SystemNotification;

@Repository
public interface SystemNotificationRepository extends JpaRepository<SystemNotification, String> {     
}
