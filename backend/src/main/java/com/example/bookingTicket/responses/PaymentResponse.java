package com.example.bookingTicket.responses;

public class PaymentResponse {
    private String paymentUrl;
    private String paymentId;
    private String status;

    public PaymentResponse(String paymentUrl, String paymentId, String status) {
        this.paymentUrl = paymentUrl;
        this.paymentId = paymentId;
        this.status = status;
    }

    public String getPaymentUrl() {
        return paymentUrl;
    }

    public void setPaymentUrl(String paymentUrl) {
        this.paymentUrl = paymentUrl;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
} 