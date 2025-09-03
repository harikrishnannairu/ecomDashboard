package com.ecom_dashboard.ecom.controller;

import com.ecom_dashboard.ecom.assembler.OrderMapper;
import com.ecom_dashboard.ecom.dto.OrderResponse;
import com.ecom_dashboard.ecom.dto.ProductRequest;
import com.ecom_dashboard.ecom.dto.UpdateOrderRequest;
import com.ecom_dashboard.ecom.dto.orderResponsePagination;
import com.ecom_dashboard.ecom.entity.Order;
import com.ecom_dashboard.ecom.request.PlaceOrderRequest;
import com.ecom_dashboard.ecom.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    @PostMapping
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody PlaceOrderRequest request){
        Order order=orderService.placeOrder(request);
        return ResponseEntity.ok(OrderMapper.toResponse(order));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<orderResponsePagination> getAllOrders(@RequestParam(defaultValue="0") int page,@RequestParam(defaultValue = "10") int size){
        Page<Order> order = orderService.getAllOrders(PageRequest.of(page,size));
        List<OrderResponse> orders=order.stream()
                .map(OrderMapper::toResponse)
                .collect(Collectors.toList()
        );
        orderResponsePagination response=new orderResponsePagination();
        response.setOrders(orders);
        response.setCurrentPage(order.getNumber());
        response.setTotalElements(order.getTotalElements());
        response.setTotalPages(order.getTotalPages());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('STAFF','USER','ADMIN')")
    public ResponseEntity<List<OrderResponse>> getMyOrders(){
        List<Order> order = orderService.getMyOrder();
        return ResponseEntity.ok(order.stream()
                .map(OrderMapper::toResponse)
                .collect(Collectors.toList()));
    }

    @PutMapping("/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> updateOrder(@PathVariable Long orderId,
                                                           @RequestBody UpdateOrderRequest updateOrderRequest ) {
        Order updateOrder=orderService.updateOrder(orderId,updateOrderRequest);
        OrderResponse updatedResponse= OrderMapper.toResponse(updateOrder);
        return ResponseEntity.ok(updatedResponse);

    }



}
