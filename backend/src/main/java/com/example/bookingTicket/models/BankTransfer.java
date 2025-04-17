package com.example.bookingTicket.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("BANK_TRANSFER")
public class BankTransfer extends Payment {
    
}
