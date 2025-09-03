package com.ecom_dashboard.ecom.repository;

import com.ecom_dashboard.ecom.entity.Product;
import com.ecom_dashboard.ecom.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCreatedBy(User user);

    @Query(value = "SELECT COUNT(*) FROM product", nativeQuery = true)
    Long getTotalProducts();
}
