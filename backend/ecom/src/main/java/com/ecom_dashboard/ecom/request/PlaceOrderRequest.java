package com.ecom_dashboard.ecom.request;

import lombok.Data;

import java.util.List;

@Data
public class PlaceOrderRequest {
    List<PlaceOrderRequestItem> items;
}
