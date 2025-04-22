package com.example.bookingTicket.controllers;

import com.example.bookingTicket.models.Account;
import com.example.bookingTicket.repositories.AccountRepository;
import com.example.bookingTicket.enums.EAccType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/dang-nhap")
    public ResponseEntity<Map<String, String>> login(
            @RequestParam("name") String userName,
            @RequestParam("password") String password,
            HttpServletRequest request) {
        
        Account account = accountRepository.findByUserName(userName);
        Map<String, String> response = new HashMap<>();
        
        if (account == null) {
            response.put("error", "Tên người dùng không tồn tại.");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (!password.equals(account.getPassword())) {
            response.put("error", "Mật khẩu không đúng.");
            return ResponseEntity.badRequest().body(response);
        }
        
        response.put("message", "Đăng nhập thành công");
        response.put("userType", account.getType().toString());
        response.put("userName", userName);
        
        return ResponseEntity.ok().body(response);
    }

    // Xóa hoàn toàn phương thức handleOptions() nếu dùng CorsFilter
}