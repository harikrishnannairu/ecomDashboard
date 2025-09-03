package com.ecom_dashboard.ecom.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
    private List<OrderItemRequest> items;
}
