package com.example.bookingTicket.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Owner extends User {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;

    @OneToMany(mappedBy = "owner")
    private List<Bus> buses;

    public void addBus() {
        // Implementation
    }

    public void deleteBus() {
        // Implementation
    }

    public void updateBus() {
        // Implementation
    }

    public void viewBusReport() {
        // Implementation
    }

    public void viewRevenue() {
        // Implementation
    }

    // Getters and Setters
    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<Bus> getBuses() {
        return buses;
    }

    public void setBuses(List<Bus> buses) {
        this.buses = buses;
    }
}
