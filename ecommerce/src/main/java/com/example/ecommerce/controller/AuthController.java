// src/main/java/com/example/ecommerce/controller/AuthController.java
package com.example.ecommerce.controller;

import com.example.ecommerce.dto.LoginRequest;
import com.example.ecommerce.dto.UserDto;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        if (user == null || !user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = JwtUtil.generateToken(user.getUsername());

        UserDto userDto = new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().toString(),
                user.getFirstName(),
                user.getLastName());

        return ResponseEntity.ok().body(
                new java.util.HashMap<>() {
                    {
                        put("token", token);
                        put("user", userDto);
                    }
                });
    }

}
