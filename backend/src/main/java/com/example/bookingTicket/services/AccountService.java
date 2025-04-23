package com.example.bookingTicket.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookingTicket.models.Account;
import com.example.bookingTicket.repositories.AccountRepository;

@Service
public class AccountService {
    
    @Autowired
    private AccountRepository accountRepository;
    
    public Account findByUsername(String username) {
        return accountRepository.findByUserName(username);
    }
    
    public boolean verifyPassword(Account account, String password) {
        if (account == null) {
            return false;
        }
        return password.equals(account.getPassword());
    }
} 