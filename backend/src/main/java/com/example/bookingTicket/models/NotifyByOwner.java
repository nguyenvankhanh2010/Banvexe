package com.example.bookingTicket.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class NotifyByOwner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Owner sender;

    @ManyToOne
    @JoinColumn(name = "notification_id", nullable = false)
    private SystemNotification systemNotification;

    // Getters và Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public Owner getSender() { return sender; }
    public void setSender(Owner sender) { this.sender = sender; }
    public SystemNotification getSystemNotification() { return systemNotification; }
    public void setSystemNotification(SystemNotification systemNotification) { this.systemNotification = systemNotification; }

    // Methods
    public void changeNotification() {

    }

    public void deleteNotification() {

    }

    public void sendNotification() {

    }
}
