package com.example.bookingTicket.dto;

import java.time.LocalDateTime;

public class TripDTO {
    private Long id;
    private String tripId;
    private String origin;
    private String destination;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String busType;
    private double price;
    private int availableSeats;
    private BusDTO bus;
    private Long busId;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTripId() { return tripId; }
    public void setTripId(String tripId) { this.tripId = tripId; }
    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public LocalDateTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalDateTime departureTime) { this.departureTime = departureTime; }
    public LocalDateTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalDateTime arrivalTime) { this.arrivalTime = arrivalTime; }
    public String getBusType() { return busType; }
    public void setBusType(String busType) { this.busType = busType; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
    public BusDTO getBus() { return bus; }
    public void setBus(BusDTO bus) { this.bus = bus; }
    public Long getBusId() {
        return busId;
    }

    public void setBusId(Long busId) {
        this.busId = busId;
    }
}
