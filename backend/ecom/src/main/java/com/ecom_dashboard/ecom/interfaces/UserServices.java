package com.ecom_dashboard.ecom.interfaces;

import com.ecom_dashboard.ecom.dto.UserResponse;

import java.util.List;

public interface UserServices {
    List<UserResponse> getAllUsers();
    UserResponse getUserBydId(Long id);
    String deleteUser(Long id);
}
