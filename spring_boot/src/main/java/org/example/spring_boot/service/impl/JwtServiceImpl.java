package org.example.spring_boot.service.impl;

import org.example.spring_boot.dto.response.UserResponse;
import org.example.spring_boot.service.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    public String signToken(UserResponse user, Long tokenExpiration, String type) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + tokenExpiration);
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        Map<String, String> claimsMap = new HashMap<>();
        claimsMap.put("email", user.getEmail());
        claimsMap.put("role", user.getRole().toString());
        claimsMap.put("type", type);
        return Jwts.builder().subject(user.getId().toString()).issuedAt(now).expiration(expiryDate)
                .claims(claimsMap).signWith(key).compact();
    }

}
