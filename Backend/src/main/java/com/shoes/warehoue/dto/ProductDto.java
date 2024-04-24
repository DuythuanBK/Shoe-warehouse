package com.shoes.warehoue.dto;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonTypeName("product")
public class ProductDto {
    private Long id;
    private String code;
    private String image;
    private String note;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonTypeName("products")
    public static class MultipleProducts {
        private List<ProductDto> products;
        private long productsCount;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonTypeName("product")
    public static class Product {
        private String code;
        private String image;
        private String note;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonTypeName("product")
    public static class CreateProduct {
        private String code;
        private MultipartFile file;
        private String note;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductQuantity {
        private Long id;
        private String code;
        private String image;
        private String note;
        private Long stockQuantity;
        private Long importQuantity;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MultipleProductQuantity {
        private List<ProductQuantity> products;
        private long productsCount;
    }

}
