package com.example.bookingTicket.dto;

import java.time.LocalDateTime;

public class TicketInfoDTO {
    private String bookingCode;
    private String customerName;
    private String phone;
    private String route;
    private LocalDateTime arrivalTime;
    private String seatNumber;
    private String ticketStatus;
    private String paymentStatus;

    // Constructor
    public TicketInfoDTO(String bookingCode, String customerName, String phone,
            String route, LocalDateTime arrivalTime, String seatNumber,
            String ticketStatus, String paymentStatus) {
        this.bookingCode = bookingCode;
        this.customerName = customerName;
        this.phone = phone;
        this.route = route;
        this.arrivalTime = arrivalTime;
        this.seatNumber = seatNumber;
        this.ticketStatus = ticketStatus;
        this.paymentStatus = paymentStatus;
    }

    // Getters and Setters (hoặc dùng Lombok)
}
