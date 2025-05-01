package com.example.bookingTicket.models;

import java.time.LocalDateTime;
import java.util.List;

import com.example.bookingTicket.enums.ENotifiType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(name = "notification_date")
    private LocalDateTime date;

    @Column(name = "notifi_id")
    private String notifiId;

    @Column(name = "title")
    private String title;

    @Column(nullable = false)
    private String receiving;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ENotifiType type;

    public void displayNotification() {
        // Implementation
    }

    public void sendNotification() {
        // Implementation
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getNotifiId() {
        return notifiId;
    }

    public void setNotifiId(String notifiId) {
        this.notifiId = notifiId;
    }

    public String getReceiving() {
        return receiving;
    }

    public void setReceiving(String receiving) {
        this.receiving = receiving;
    }

    public ENotifiType getType() {
        return type;
    }

    public void setType(ENotifiType type) {
        this.type = type;
    }

    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    @OneToMany(mappedBy = "notification", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserNotification> userNotifications;
} 