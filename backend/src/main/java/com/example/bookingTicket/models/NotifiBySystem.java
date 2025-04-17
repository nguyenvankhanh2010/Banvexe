package com.example.bookingTicket.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SYSTEM")
public class NotifiBySystem extends SystemNotification {
    // ... rest of the code stays the same ...
} 