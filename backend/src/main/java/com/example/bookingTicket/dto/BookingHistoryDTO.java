package com.example.bookingTicket.dto;

import java.time.LocalDateTime;

import com.example.bookingTicket.enums.ETicketStatus;
import com.example.bookingTicket.models.BookingHistory;
import com.fasterxml.jackson.annotation.JsonFormat;

public class BookingHistoryDTO {
    private Long id;
    private String passengerName;
    private String passengerEmail;
    private String passengerPhone;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private LocalDateTime bookingTime;
    private ETicketStatus status;
    private String seatNumber;
    private String origin;
    private String destination;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private LocalDateTime departureTime;
    private Double price;

    public BookingHistoryDTO(BookingHistory booking) {
        System.out.println("Creating DTO for booking ID: " + booking.getId());
        
        this.id = booking.getId();
        this.passengerName = booking.getPassengerName();
        this.passengerEmail = booking.getPassengerEmail();
        this.passengerPhone = booking.getPassengerPhone();
        this.bookingTime = booking.getBookingTime();
        this.status = booking.getStatus();
        
        System.out.println("Raw booking time: " + booking.getBookingTime());
        System.out.println("Formatted booking time: " + this.bookingTime);
        
        if (booking.getSeat() != null) {
            this.seatNumber = booking.getSeat().getSeatNumber();
            System.out.println("Seat number set to: " + this.seatNumber);
        }
        
        if (booking.getTrip() != null) {
            this.origin = booking.getTrip().getOrigin();
            this.destination = booking.getTrip().getDestination();
            this.departureTime = booking.getTrip().getDepartureTime();
            this.price = booking.getTrip().getPrice();
            System.out.println("Trip details - Origin: " + this.origin + 
                             ", Destination: " + this.destination + 
                             ", Raw departure time: " + booking.getTrip().getDepartureTime() +
                             ", Formatted departure time: " + this.departureTime);
        }
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public String getPassengerEmail() {
        return passengerEmail;
    }

    public String getPassengerPhone() {
        return passengerPhone;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public ETicketStatus getStatus() {
        return status;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDestination() {
        return destination;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public Double getPrice() {
        return price;
    }
} 