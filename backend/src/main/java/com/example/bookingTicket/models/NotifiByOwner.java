package com.example.bookingTicket.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@DiscriminatorValue("OWNER")
public class NotifiByOwner extends Notification {
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Owner sender;

    public void changeNotification() {
        // Implementation
    }

    public void delNotification() {
        // Implementation
    }

    public void displayNotification() {
        // Implementation
    }

    public void sendNotification() {
        // Implementation
    }

    // Getters and Setters
    public Owner getSender() {
        return sender;
    }

    public void setSender(Owner sender) {
        this.sender = sender;
    }
} 