package com.ecom_dashboard.ecom.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class OrderSummaryDto {
    private String status;
    private long count;
    public OrderSummaryDto(String status, long count) {
        this.status = status;
        this.count = count;
    }

}
