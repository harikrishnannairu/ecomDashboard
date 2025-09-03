package com.ecom_dashboard.ecom.controller;

import com.ecom_dashboard.ecom.dto.DashboardStatsDto;
import com.ecom_dashboard.ecom.dto.OrderResponse;
import com.ecom_dashboard.ecom.dto.OrderSummaryDto;
import com.ecom_dashboard.ecom.dto.SalesTrendDto;
import com.ecom_dashboard.ecom.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // 📊 Get sales trend (date vs total sales)
    @GetMapping("/sales-trend")
    public List<SalesTrendDto> getSalesTrend() {
        return dashboardService.getSalesTrend();
    }

    // 📦 Get orders count grouped by status
        @GetMapping("/orders-summary")
    public List<OrderSummaryDto> getOrdersCount() {
        return dashboardService.getOrdersCount();
    }

    // 🏆 Get top products (by order frequency)
    @GetMapping("/recent-orders")
    public List<OrderResponse> getRecentOrders() {
        return dashboardService.getRecentOrders();
    }

    @GetMapping("/stats")
    public DashboardStatsDto getStats() {
        return dashboardService.getStats();
    }
}
