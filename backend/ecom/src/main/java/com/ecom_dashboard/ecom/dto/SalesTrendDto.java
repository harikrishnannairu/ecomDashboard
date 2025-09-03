package com.ecom_dashboard.ecom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Builder
public class SalesTrendDto {
    private String month;
    private BigDecimal revenue;

    public SalesTrendDto(String month, BigDecimal revenue) {
        this.month = month;
        this.revenue = revenue != null ? revenue : BigDecimal.ZERO;
    }
}
