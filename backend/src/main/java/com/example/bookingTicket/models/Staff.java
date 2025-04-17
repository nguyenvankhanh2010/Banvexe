package com.example.bookingTicket.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Staff extends User {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;

    public void manageBooking() {
        // Implementation
    }

    public void manageCustomer() {
        // Implementation
    }

    public void manageOwner() {
        // Implementation
    }

    public void managePromotion() {
        // Implementation
    }

    public void manageReport() {
        // Implementation
    }

    public void manageTrip() {
        // Implementation
    }

    public void viewReport() {
        // Implementation
    }

    // Getters and Setters
    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
