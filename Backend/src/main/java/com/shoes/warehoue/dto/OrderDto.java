package com.shoes.warehoue.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private Long id;
    private String productCode;
    private Long quantity;
    private Long weight;
    private Long price;
    private String shipTime;
    private String shipService;
    private String status;
    private String note;
    private CustomerDto customer;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MultipleOrders {
        private List<OrderDto> orders;
        private long orderCount;
    }
}
