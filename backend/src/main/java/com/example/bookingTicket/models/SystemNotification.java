package com.example.bookingTicket.models;

import java.time.LocalDateTime;
import java.util.List;

import com.example.bookingTicket.enums.ENotificationType;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "notification_type", discriminatorType = DiscriminatorType.STRING)
public class SystemNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime receivingTime;

    @Column(name = "notification_category")
    @Enumerated(EnumType.STRING)
    private ENotificationType notificationType;

    @OneToOne(mappedBy = "systemNotification")
    private User user;

    @OneToMany(mappedBy = "systemNotification")
    private List<NotifyByOwner> notifyByOwners;

    // Getters và Setters
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

    public LocalDateTime getReceivingTime() {
        return receivingTime;
    }

    public void setReceivingTime(LocalDateTime receivingTime) {
        this.receivingTime = receivingTime;
    }

    public ENotificationType getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(ENotificationType notificationType) {
        this.notificationType = notificationType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<NotifyByOwner> getNotifyByOwners() {
        return notifyByOwners;
    }

    public void setNotifyByOwners(List<NotifyByOwner> notifyByOwners) {
        this.notifyByOwners = notifyByOwners;
    }

    // Methods
    public void displayNotification() {

    }

    public void sendNotification() {

    }
}
