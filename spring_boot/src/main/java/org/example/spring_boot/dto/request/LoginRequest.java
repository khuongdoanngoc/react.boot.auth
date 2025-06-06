package org.example.spring_boot.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "Email is required!")
    @Email(message = "Invalid email!")
    private String email;

    @NotBlank(message = "Password is required!")
    @Size(min = 8, message = "Email or password is incorrect.")
    private String password;
}
