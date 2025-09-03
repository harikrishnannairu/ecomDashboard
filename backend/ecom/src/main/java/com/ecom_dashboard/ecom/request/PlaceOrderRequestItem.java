package com.ecom_dashboard.ecom.request;

import lombok.Data;

@Data
public class PlaceOrderRequestItem {
    private Long productId;
    private int quantity;
}
