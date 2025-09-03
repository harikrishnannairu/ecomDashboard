package com.ecom_dashboard.ecom.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "order")
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;

    private int quantity;

    private BigDecimal totalPrice;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

}
