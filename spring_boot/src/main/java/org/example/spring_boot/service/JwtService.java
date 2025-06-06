package org.example.spring_boot.service;

import org.example.spring_boot.dto.response.UserResponse;

public interface JwtService {
    String signToken(UserResponse user, Long tokenExpiration, String type);
}
