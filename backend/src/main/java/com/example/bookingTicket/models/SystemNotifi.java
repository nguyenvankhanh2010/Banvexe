package com.example.bookingTicket.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SYSTEM_NOTIFI")
public class SystemNotifi extends Notification {
    public void displayNotification() {
        // Implementation
    }

    public void sendNotification() {
        // Implementation
    }
} 