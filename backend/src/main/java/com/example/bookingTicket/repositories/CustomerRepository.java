package com.example.bookingTicket.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.example.bookingTicket.dto.CustomerProjection;
import com.example.bookingTicket.models.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query(value = """
                SELECT
                    u.id AS id,
                    u.name AS name,
                    u.email AS email,
                    u.phone AS phone,
                    u.status AS status,
                    u.gender AS gender
                FROM users u
                WHERE u.user_type = 'CUSTOMER'
            """, nativeQuery = true)
    List<CustomerProjection> findAllCustomers();

    @Query(value = """
                SELECT
                    u.id AS id,
                    u.name AS name,
                    u.email AS email,
                    u.phone AS phone,
                    u.status AS status,
                    u.gender AS gender
                FROM users u
                WHERE u.user_type = 'CUSTOMER' AND
                    (u.id LIKE CONCAT('%', :keyword, '%')
                 OR u.name LIKE CONCAT('%', :keyword, '%')
                 OR u.phone LIKE CONCAT('%', :keyword, '%')
                 OR u.email LIKE CONCAT('%', :keyword, '%')
                 OR u.status LIKE CONCAT('%', :keyword, '%'))
            """, nativeQuery = true)
    List<CustomerProjection> searchCustomers(@Param("keyword") String keyword);

    @Modifying
    @Transactional
    @Query(value = """
                UPDATE users
                SET status = CASE
                                WHEN status = 'ACTIVE' THEN 'BLOCKED'
                                ELSE 'ACTIVE'
                             END
                WHERE id = :id
                  AND user_type = 'CUSTOMER'
            """, nativeQuery = true)
    void toggleCustomerStatus(@Param("id") Long id);
}
