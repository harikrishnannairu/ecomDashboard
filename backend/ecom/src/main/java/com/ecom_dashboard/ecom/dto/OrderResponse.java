package com.ecom_dashboard.ecom.dto;

import com.ecom_dashboard.ecom.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private OrderStatus status;
    private BigDecimal totalAmount;
    private List<OrderItemResponse>  items;
}
