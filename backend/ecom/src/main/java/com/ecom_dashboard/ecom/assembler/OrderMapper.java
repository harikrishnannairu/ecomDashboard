package com.ecom_dashboard.ecom.assembler;

import com.ecom_dashboard.ecom.dto.OrderItemResponse;
import com.ecom_dashboard.ecom.dto.OrderResponse;
import com.ecom_dashboard.ecom.entity.Order;
import com.ecom_dashboard.ecom.entity.OrderItem;

import java.util.stream.Collectors;

public class OrderMapper {
    public static OrderResponse toResponse(Order order){
    return OrderResponse.builder()
            .id(order.getId())
            .createdAt(order.getCreatedAt())
            .updatedAt(order.getUpdatedAt())
            .totalAmount(order.getTotalAmount())
            .status(order.getStatus())
            .createdBy(order.getUser().getEmail())
            .items(order.getItems()
                    .stream().map(OrderMapper::toItemResponse).collect(Collectors.toList()))
            .build();

    }

    private static OrderItemResponse toItemResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .ProductName(orderItem.getProduct().getName())
                .totalPrice(orderItem.getTotalPrice())
                .quantity(orderItem.getQuantity())
                .build();
    }
}
