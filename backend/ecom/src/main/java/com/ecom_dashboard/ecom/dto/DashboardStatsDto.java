package com.ecom_dashboard.ecom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardStatsDto {
    private Long totalProducts;
    private Long totalOrders;
    private Long pendingOrders;
    private BigDecimal totalRevenue;

    // getters + setters
}
