package com.example.bookingTicket.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookingTicket.dto.CustomerProjection;
import com.example.bookingTicket.models.Customer;
import com.example.bookingTicket.repositories.CustomerRepository;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer findById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<CustomerProjection> getAllCustomers() {
        return customerRepository.findAllCustomers();
    }

    public List<CustomerProjection> searchCustomers(String keyword) {
        return customerRepository.searchCustomers(keyword);
    }

    public void toggleCustomerStatus(Long id) {
        customerRepository.toggleCustomerStatus(id);
    }

}
