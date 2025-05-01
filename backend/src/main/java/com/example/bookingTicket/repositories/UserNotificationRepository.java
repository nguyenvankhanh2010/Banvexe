package com.example.bookingTicket.repositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.bookingTicket.models.Account;
import com.example.bookingTicket.models.Notification;
import com.example.bookingTicket.models.UserNotification;

public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
    List<UserNotification> findByAccount(Account account);
    void deleteByNotification(Notification notification);
    List<UserNotification> findByNotification(Notification notification);
    Optional<UserNotification> findByAccountAndNotification(Account account, Notification notification);    }
