package com.ecom_dashboard.ecom.dto;

import com.ecom_dashboard.ecom.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
   private String name ;
   private String email;
   private String password;
   private Role role;
}
