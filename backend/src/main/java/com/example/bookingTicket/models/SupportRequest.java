package com.example.bookingTicket.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class SupportRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestID;

    @Column(nullable = false)
    private String content;

    private String note;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "supportRequest")
    private List<Ticket> bookingList;

    // Getters và Setters
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public List<Ticket> getBookingList() { return bookingList; }
    public void setBookingList(List<Ticket> bookingList) { this.bookingList = bookingList; }

    // Methods
    public void manageInfo() {

    }
}
