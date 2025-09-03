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
@Table(name="orders")
@ToString(exclude = "items")
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private BigDecimal totalAmount;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @OneToMany( mappedBy = "order",cascade = CascadeType.ALL)
    @JsonBackReference
    private List<OrderItem> items;
}
