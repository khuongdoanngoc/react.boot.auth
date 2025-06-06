package org.example.spring_boot.service;

import org.example.spring_boot.dto.response.ApiResponse;
import org.example.spring_boot.dto.response.LoginResponse;
import org.example.spring_boot.model.Role;
public interface UserService {
    ApiResponse<Void> register(String fullName, String email, String password, Role role);

    ApiResponse<LoginResponse> login(String email, String password);

}
