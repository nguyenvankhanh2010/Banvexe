package com.example.bookingTicket.models;

import java.time.LocalDateTime;

import com.example.bookingTicket.enums.EPaymentMethod;
import com.example.bookingTicket.enums.EPaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EPaymentStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EPaymentMethod method;

    @OneToOne
    @JoinColumn(name = "booking_history_id", nullable = false)
    private BookingHistory bookingHistory;

    @Column(name = "payment_time", nullable = false)
    private LocalDateTime paymentTime;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public EPaymentStatus getStatus() {
        return status;
    }

    public void setStatus(EPaymentStatus status) {
        this.status = status;
    }

    public EPaymentMethod getMethod() {
        return method;
    }

    public void setMethod(EPaymentMethod method) {
        this.method = method;
    }

    public BookingHistory getBookingHistory() {
        return bookingHistory;
    }

    public void setBookingHistory(BookingHistory bookingHistory) {
        this.bookingHistory = bookingHistory;
    }

    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(LocalDateTime paymentTime) {
        this.paymentTime = paymentTime;
    }
}