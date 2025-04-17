package com.example.bookingTicket.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int promotionID;

    private String description;

    private float discountRate;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime startDate;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "promotion")
    private List<Ticket> bookingList;

    @ManyToMany
    @JoinTable(
        name = "promotion_customer",
        joinColumns = @JoinColumn(name = "promotion_id"),
        inverseJoinColumns = @JoinColumn(name = "customer_id")
    )
    private List<Customer> customerList;

    // Getters và Setters
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public float getDiscountRate() { return discountRate; }
    public void setDiscountRate(float discountRate) { this.discountRate = discountRate; }
    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    public List<Ticket> getBookingList() { return bookingList; }
    public void setBookingList(List<Ticket> bookingList) { this.bookingList = bookingList; }
    public List<Customer> getCustomerList() { return customerList; }
    public void setCustomerList(List<Customer> customerList) { this.customerList = customerList; }

    // Methods
    public void manageInfo() {

    }

    public void applyPromotion() {

    }
}
