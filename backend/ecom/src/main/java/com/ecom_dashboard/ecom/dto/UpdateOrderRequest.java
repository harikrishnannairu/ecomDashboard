package com.ecom_dashboard.ecom.dto;

import com.ecom_dashboard.ecom.entity.OrderStatus;
import lombok.Data;

@Data
public class UpdateOrderRequest {
    private OrderStatus status;
}
