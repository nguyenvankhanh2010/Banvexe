package com.example.bookingTicket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookingTicket.enums.EAccType;
import com.example.bookingTicket.models.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByUserName(String userName);
    List<Account> findByType(EAccType type);
}
