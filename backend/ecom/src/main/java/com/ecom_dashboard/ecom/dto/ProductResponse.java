package com.ecom_dashboard.ecom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private String name;
    private Long id;
    private String description;
    private int quantity;
    private BigDecimal price;
    private String createdBy;
}
