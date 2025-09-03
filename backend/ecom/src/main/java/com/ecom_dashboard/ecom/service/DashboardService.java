package com.ecom_dashboard.ecom.service;


import com.ecom_dashboard.ecom.dto.DashboardStatsDto;
import com.ecom_dashboard.ecom.dto.OrderResponse;
import com.ecom_dashboard.ecom.dto.OrderSummaryDto;
import com.ecom_dashboard.ecom.dto.SalesTrendDto;
import com.ecom_dashboard.ecom.entity.Order;
import com.ecom_dashboard.ecom.repository.OrderRepository;
import com.ecom_dashboard.ecom.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

//    public DashboardStatsDto getStats() {
//        long totalProducts = productRepository.count();
//        long totalOrders = orderRepository.count();
//        long pendingOrders = orderRepository.count((root, query, cb) -> cb.equal(root.get("status"), "PENDING"));
//
//        BigDecimal totalRevenue = orderRepository.findAll().stream()
//                .map(Order::getTotalAmount)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//        DashboardStatsDto dto = new DashboardStatsDto();
//        dto.setTotalProducts(totalProducts);
//        dto.setTotalOrders(totalOrders);
//        dto.setPendingOrders(pendingOrders);
//        dto.setTotalRevenue(totalRevenue);
//        return dto;
//    }

//    public List<OrderSummaryDto> getOrdersSummary() {
//        return orderRepository.countOrdersByStatus();
//    }
//   public List<SalesTrendDto> getSalesTrend() {
//        return orderRepository.getSalesTrend();
//    }

    public List<OrderSummaryDto> getOrdersCount() {
        List<Object[]> results = orderRepository.getOrdersCountRaw();
        return results.stream().map(row -> {
            OrderSummaryDto dto = new OrderSummaryDto();
            dto.setStatus((String) row[0]);
            dto.setCount(((Number) row[1]).longValue());
            return dto;
        }).collect(Collectors.toList());
    }

public List<SalesTrendDto> getSalesTrend() {
    List<Object[]> results = orderRepository.getSalesTrendRaw();
    return results.stream().map(row -> {
        SalesTrendDto dto = new SalesTrendDto();
        dto.setMonth((String) row[0]);
        dto.setRevenue((BigDecimal) row[1]);
        return dto;
    }).collect(Collectors.toList());
}
    public List<OrderResponse> getRecentOrders() {
        return orderRepository.findAll(PageRequest.of(0, 5))
                .getContent()
                .stream()
                .map(o -> {
                    OrderResponse dto = new OrderResponse();
                    dto.setId(o.getId());
                    dto.setCreatedBy(o.getUser().getEmail());
//                    dto.setCustomerName(o.getUser().getName());
                    dto.setTotalAmount(o.getTotalAmount());
                    dto.setStatus(o.getStatus());
                    dto.setCreatedAt(o.getCreatedAt());
                    dto.setUpdatedAt(o.getUpdatedAt());
                    return dto;
                }).collect(Collectors.toList());
    }
//    method to get the summary of products and orders
public DashboardStatsDto getStats() {
    Long totalProducts = productRepository.getTotalProducts();
    Long totalOrders = orderRepository.getTotalOrders();
    Long pendingOrders = orderRepository.getPendingOrders();
    BigDecimal totalRevenue = orderRepository.getTotalRevenue();

    return new DashboardStatsDto(totalProducts, totalOrders, pendingOrders, totalRevenue);
}
}
