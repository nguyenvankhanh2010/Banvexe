package com.example.bookingTicket.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("STAFF")
public class NotifiByStaff extends SystemNotification {
    // ... rest of the code stays the same ...
} 