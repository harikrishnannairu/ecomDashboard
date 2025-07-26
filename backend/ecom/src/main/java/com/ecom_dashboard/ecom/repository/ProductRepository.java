package com.ecom_dashboard.ecom.repository;

import com.ecom_dashboard.ecom.entity.Product;
import com.ecom_dashboard.ecom.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCreatedBy(User user);
}
