package com.example.bookingTicket.dto;

import com.example.bookingTicket.enums.ESeatStatus;

public class SeatDTO {
    private Long id;
    private String seatNumber;
    private ESeatStatus status;
    private Long busId;
    private String busNumber;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }
    
    public ESeatStatus getStatus() { return status; }
    public void setStatus(ESeatStatus status) { this.status = status; }
    
    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }
    
    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
} 