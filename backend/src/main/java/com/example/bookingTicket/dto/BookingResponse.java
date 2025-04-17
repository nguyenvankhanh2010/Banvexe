package com.example.bookingTicket.dto;

public class BookingResponse {
    private Long id;
    private String passengerName;
    private String passengerPhone;
    private String passengerEmail;
    private String seatNumber;
    private String tripInfo;
    private String bookingTime;

    public BookingResponse(Long id, String passengerName, String passengerPhone, String passengerEmail, 
                         String seatNumber, String tripInfo, String bookingTime) {
        this.id = id;
        this.passengerName = passengerName;
        this.passengerPhone = passengerPhone;
        this.passengerEmail = passengerEmail;
        this.seatNumber = seatNumber;
        this.tripInfo = tripInfo;
        this.bookingTime = bookingTime;
    }

    // Getters
    public Long getId() { return id; }
    public String getPassengerName() { return passengerName; }
    public String getPassengerPhone() { return passengerPhone; }
    public String getPassengerEmail() { return passengerEmail; }
    public String getSeatNumber() { return seatNumber; }
    public String getTripInfo() { return tripInfo; }
    public String getBookingTime() { return bookingTime; }
} 