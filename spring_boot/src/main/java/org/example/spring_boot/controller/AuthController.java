package org.example.spring_boot.controller;

import org.example.spring_boot.dto.request.LoginRequest;
import org.example.spring_boot.dto.request.RegisterRequest;
import org.example.spring_boot.dto.response.ApiResponse;
import org.example.spring_boot.dto.response.LoginResponse;
import org.example.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ApiResponse<Void> register(@RequestBody @Valid RegisterRequest request) {
        return userService.register(request.getFullName(), request.getEmail(), request.getPassword(), request.getRole());
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }
}