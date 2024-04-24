package com.shoes.warehoue.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockDto {
    private Long id;
    private String productCode;
    private Long quantity;
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MultipleProduct {
        private List<StockDto> stocks;
        private long stockCount;
    }
}
