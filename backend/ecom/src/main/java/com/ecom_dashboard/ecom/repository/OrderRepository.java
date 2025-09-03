package com.ecom_dashboard.ecom.repository;

import com.ecom_dashboard.ecom.dto.OrderSummaryDto;
import com.ecom_dashboard.ecom.dto.SalesTrendDto;
import com.ecom_dashboard.ecom.entity.Order;
import com.ecom_dashboard.ecom.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long>, JpaSpecificationExecutor<Order> {
    Page<Order> findAll(Pageable pageable);
    List<Order> findByUser(User user);

//    @Query("SELECT new com.ecom_dashboard.ecom.dto.OrderSummaryDto(o.status, CAST(COUNT(o) AS long)) " +
//            "FROM Order o GROUP BY o.status")
//    List<OrderSummaryDto> countOrdersByStatus();
//
//    @Query("SELECT new com.ecom_dashboard.ecom.dto.SalesTrendDto(FUNCTION('MONTHNAME', o.createdAt), CAST(SUM(o.totalAmount) AS bigdecimal)) " +
//            "FROM Order o GROUP BY FUNCTION('MONTH', o.createdAt), FUNCTION('MONTHNAME', o.createdAt) " +
//            "ORDER BY FUNCTION('MONTH', o.createdAt)")
//    List<SalesTrendDto> getSalesTrend();
//@Query(
//        value = "SELECT MONTHNAME(o.created_at) AS month, SUM(o.total_amount) AS revenue " +
//                "FROM orders o " +
//                "GROUP BY MONTH(o.created_at), MONTHNAME(o.created_at) " +
//                "ORDER BY MONTH(o.created_at)",
//        nativeQuery = true
//)
//List<Object[]> getSalesTrendRaw();
@Query(
        value = "SELECT TO_CHAR(o.created_at, 'Mon') AS month, SUM(o.total_amount) AS revenue " +
                "FROM orders o " +
                "GROUP BY EXTRACT(MONTH FROM o.created_at), TO_CHAR(o.created_at, 'Mon') " +
                "ORDER BY EXTRACT(MONTH FROM o.created_at)",
        nativeQuery = true
)
List<Object[]> getSalesTrendRaw();

    @Query(
            value = "SELECT o.status AS status, COUNT(*) AS count " +
                    "FROM orders o " +
                    "GROUP BY o.status",
            nativeQuery = true
    )
    List<Object[]> getOrdersCountRaw();

    // Orders count
    @Query(value = "SELECT COUNT(*) FROM orders", nativeQuery = true)
    Long getTotalOrders();

    // Pending orders count
    @Query(value = "SELECT COUNT(*) FROM orders WHERE status = 'PENDING'", nativeQuery = true)
    Long getPendingOrders();

    // Total revenue (sum of all orders)
    @Query(value = "SELECT COALESCE(SUM(total_amount), 0) FROM orders", nativeQuery = true)
    BigDecimal getTotalRevenue();
}
