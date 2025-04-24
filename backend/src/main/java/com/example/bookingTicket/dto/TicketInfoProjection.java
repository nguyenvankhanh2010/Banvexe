package com.example.bookingTicket.dto;

import java.time.LocalDateTime;

public interface TicketInfoProjection {
    String getBookingCode();

    String getCustomerName();

    String getPhone();

    String getRoute();

    LocalDateTime getArrivalTime(); // hoặc String nếu bạn muốn xử lý định dạng tại frontend

    String getSeatNumber();

    String getTicketStatus();

    String getPaymentStatus();
}
