package com.example.bookingTicket.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookingTicket.repositories.NotifyByOwnerRepository;
import com.example.bookingTicket.repositories.SystemNotificationRepository;
import com.example.bookingTicket.models.Notification;
import com.example.bookingTicket.models.NotifiBySystem;


@Service
public class NotifyService {
    @Autowired
    public SystemNotificationRepository systemNotifyRepository;

    @Autowired
    public NotifyByOwnerRepository notifyByOnwnerRepository;

    //Get Notify List
}
