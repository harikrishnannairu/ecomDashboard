package com.ecom_dashboard.ecom.service;

import com.ecom_dashboard.ecom.dto.ProductRequest;
import com.ecom_dashboard.ecom.dto.UpdateOrderRequest;
import com.ecom_dashboard.ecom.entity.*;
import com.ecom_dashboard.ecom.repository.OrderRepository;
import com.ecom_dashboard.ecom.repository.ProductRepository;
import com.ecom_dashboard.ecom.repository.UserRepository;
import com.ecom_dashboard.ecom.request.PlaceOrderRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public Order placeOrder(PlaceOrderRequest request) {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email).orElseThrow();

        Order order=new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());
            List<OrderItem> items= request.getItems().stream()
                    .map(
                            itemRequest->{
                                Product product=productRepository.findById(itemRequest.getProductId()).orElseThrow();
                                OrderItem item=new OrderItem();
                                item.setProduct(product);
                                item.setQuantity(itemRequest.getQuantity());
                                item.setTotalPrice(product.getPrice());
                                item.setOrder(order);
                                return item;
                            }
                    )
                    .collect(Collectors.toList());
        BigDecimal totalAmount=items.stream()
                .map(OrderItem::getTotalPrice)
                .reduce(BigDecimal.ZERO,BigDecimal::add);
        order.setTotalAmount(totalAmount);
        order.setItems(items);
        return orderRepository.save(order);
    }

    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public List<Order> getMyOrder() {
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        User user=userRepository.findByEmail(email)
                .orElseThrow(()-> new EntityNotFoundException("User not found"));
        return orderRepository.findByUser(user);
    }

    public Order updateOrder(Long orderId, UpdateOrderRequest updateOrderRequest) {
        Order order=orderRepository.findById(orderId).orElseThrow(()-> new EntityNotFoundException("order not found"));
        order.setUpdatedAt(LocalDateTime.now());
        order.setStatus(updateOrderRequest.getStatus());
        return orderRepository.save(order);
    }
}
