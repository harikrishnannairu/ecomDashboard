package com.ecom_dashboard.ecom.controller;

import com.ecom_dashboard.ecom.dto.AuthResponse;
import com.ecom_dashboard.ecom.dto.RegisterRequest;
import com.ecom_dashboard.ecom.dto.UserResponse;
import com.ecom_dashboard.ecom.entity.User;
import com.ecom_dashboard.ecom.interfaces.UserServices;
import com.ecom_dashboard.ecom.service.AuthService;
import com.ecom_dashboard.ecom.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/")
@RequiredArgsConstructor
public class UserController {

    private final UserServices userService;
    private final AuthService authService;
    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserBydId(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
       return ResponseEntity.ok("Deleted Succesfully");
    }
    @PostMapping("/createUser")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addNewUser(@RequestBody RegisterRequest user){
        AuthResponse token=authService.register( user);
        if(token != null){
            return ResponseEntity.ok("User created succesfully");
        }
        return ResponseEntity.badRequest().body("user not created");
    }
}
