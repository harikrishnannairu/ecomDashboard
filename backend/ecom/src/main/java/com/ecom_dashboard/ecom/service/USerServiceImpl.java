package com.ecom_dashboard.ecom.service;

import com.ecom_dashboard.ecom.dto.UserResponse;
import com.ecom_dashboard.ecom.entity.User;
import com.ecom_dashboard.ecom.exception.UserNotFoundException;
import com.ecom_dashboard.ecom.interfaces.UserServices;
import com.ecom_dashboard.ecom.repository.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class USerServiceImpl implements UserServices {

    private final UserRepository userRepository;
    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserBydId(Long id) {
        User user= userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException("user not found with id"+id));
        return mapToResponse(user);
    }

    @Override
    public String deleteUser(Long id) {
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException("User not found with id" +id);
        }
        userRepository.deleteById(id);
        return "Deleted succesfully";
    }
    public UserResponse mapToResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

    }
}
