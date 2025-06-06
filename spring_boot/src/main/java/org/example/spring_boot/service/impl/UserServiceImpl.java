package org.example.spring_boot.service.impl;

import org.example.spring_boot.dto.response.ApiResponse;
import org.example.spring_boot.dto.response.LoginResponse;
import org.example.spring_boot.dto.response.UserResponse;
import org.example.spring_boot.exception.ApiException;
import org.example.spring_boot.model.Role;
import org.example.spring_boot.model.User;
import org.example.spring_boot.repository.UserRepository;
import org.example.spring_boot.service.JwtService;
import org.example.spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtService jwtService;

    @Value("${jwt.access-token.expiration}")
    private Long accessTokenExpiration;

    @Value("${jwt.refresh-token.expiration}")
    private Long refreshokenExpiration;

    @Override
    public ApiResponse<LoginResponse> login(String email, String password) {

        if (email == null || password == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid request");
        }
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Email or password incorrect!");
        }
        if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Email or password incorrect!");
        } else {
            try {
                UserResponse userResponse = new UserResponse(user.getId(), user.getFullname(), user.getEmail(),
                        user.getRole());
                String accessToken = jwtService.signToken(userResponse, accessTokenExpiration, "access");
                String refreshToken = jwtService.signToken(userResponse, refreshokenExpiration, "refresh");
                LoginResponse loginResponse = new LoginResponse(accessToken, refreshToken, userResponse);
                return new ApiResponse<LoginResponse>(true, "User logged successfully!", loginResponse);
            } catch (Exception e) {
                throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
            }
        }
    }

    @Override
    public ApiResponse<Void> register(String fullName, String email, String password, Role role) {
        if (fullName == null || email == null || password == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid request");
        }
        boolean isUserExist = userRepository.findByEmail(email) != null;
        if (isUserExist) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "User already exists");
        }
        try {
            User user = new User();
            user.setFullname(fullName);
            user.setEmail(email);
            user.setPassword(bCryptPasswordEncoder.encode(password));
            user.setRole(role);
            userRepository.save(user);
            return new ApiResponse<Void>(true, "User registered successfully", null);
        } catch (Exception e) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
        }
    }

}
