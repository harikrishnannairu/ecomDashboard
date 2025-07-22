package com.ecom_dashboard.ecom.service;

import com.ecom_dashboard.ecom.dto.AuthResponse;
import com.ecom_dashboard.ecom.dto.LoginRequest;
import com.ecom_dashboard.ecom.dto.RegisterRequest;
import com.ecom_dashboard.ecom.entity.Role;
import com.ecom_dashboard.ecom.entity.User;
//import org.springframework.security.core.userdetails.User;
import com.ecom_dashboard.ecom.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;
    public AuthResponse register(RegisterRequest request) {
        var user= User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() == null ? Role.STAFF : request.getRole())
                .build();
        userRepository.save(user);
        var jwt= jwtService.generateToken(user);
        return AuthResponse.builder().token(jwt).build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
        );
        var user=userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new RuntimeException("user not found"));
        var jwt=jwtService.generateToken(user);
        return AuthResponse.builder().token(jwt).build();

    }
}
