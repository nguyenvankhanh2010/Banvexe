package com.example.bookingTicket.models;

import jakarta.persistence.*;
@Entity
@Table(name = "usernotification")
public class UserNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne// Sửa từ "account_id" thành "user_id"
    private Account account;

    @ManyToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @Column(name = "is_read")
    private boolean isRead;

    // Getters và setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }

    public Notification getNotification() { return notification; }
    public void setNotification(Notification notification) { this.notification = notification; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
}