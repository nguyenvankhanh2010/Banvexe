package com.example.bookingTicket.controllers;

import com.example.bookingTicket.models.Account;
import com.example.bookingTicket.services.AccountService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/dang-nhap")
    public ResponseEntity<Map<String, String>> login(
            @RequestParam("name") String userName,
            @RequestParam("password") String password,
            HttpServletRequest request,
            HttpServletResponse response) {
        
        Account account = accountService.findByUsername(userName);
        Map<String, String> responseData = new HashMap<>();
        
        if (account == null) {
            responseData.put("error", "Tên người dùng không tồn tại.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseData);
        }
        
        if (!accountService.verifyPassword(account, password)) {
            responseData.put("error", "Mật khẩu không đúng.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseData);
        }
        
        // Lưu thông tin đăng nhập vào session
        HttpSession session = request.getSession(true);
        session.setAttribute("userId", account.getUserId());
        session.setAttribute("userName", userName);
        session.setAttribute("userType", account.getType().toString());
        session.setMaxInactiveInterval(3600);
        
        // Thêm các cookie cho đăng nhập
        Cookie userCookie = new Cookie("userName", userName);
        userCookie.setPath("/");
        userCookie.setMaxAge(3600);
        userCookie.setHttpOnly(true);
        response.addCookie(userCookie);
        
        // Thêm userId vào cookie
        Cookie userIdCookie = new Cookie("userId", account.getUserId().toString());
        userIdCookie.setPath("/");
        userIdCookie.setMaxAge(3600);
        userIdCookie.setHttpOnly(false); // Cho phép JavaScript đọc cookie này
        response.addCookie(userIdCookie);
        
        responseData.put("message", "Đăng nhập thành công");
        responseData.put("userType", account.getType().toString());
        responseData.put("userName", userName);
        responseData.put("userId", account.getUserId().toString());
        
        return ResponseEntity.ok().body(responseData);
    }
    
    @PostMapping("/dang-xuat")
    public ResponseEntity<Map<String, String>> logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        
        // Xóa cookie
        Cookie userCookie = new Cookie("userName", null);
        userCookie.setPath("/");
        userCookie.setMaxAge(0);
        response.addCookie(userCookie);
        
        // Xóa userId cookie
        Cookie userIdCookie = new Cookie("userId", null);
        userIdCookie.setPath("/");
        userIdCookie.setMaxAge(0);
        response.addCookie(userIdCookie);
        
        Map<String, String> responseData = new HashMap<>();
        responseData.put("message", "Đăng xuất thành công");
        return ResponseEntity.ok().body(responseData);
    }
}