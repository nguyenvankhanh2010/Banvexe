package com.example.bookingTicket.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Customer extends User {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;

    @OneToMany(mappedBy = "customer")
    private List<Ticket> tickets;

    public void bookTicket() {
        // Implementation
    }

    public void cancelTicket() {
        // Implementation
    }

    public void changeTicket() {
        // Implementation
    }

    public void payTicket() {
        // Implementation
    }

    public void searchTrip() {
        // Implementation
    }

    public void viewBookingHistory() {
        // Implementation
    }

    public void viewPromotion() {
        // Implementation
    }

    // Getters and Setters
    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
}