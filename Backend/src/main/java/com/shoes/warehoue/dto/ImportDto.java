package com.shoes.warehoue.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImportDto {
    private Long id;
    private String shipCode;
    private String orderCode;
    private String importDate;
    private String productCode;
    private Long quantity;
    private Long price;
    private Long shipFee;
    private String status;
    private String note;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateImport {
        @NotNull
        private String shipCode;
        @NotNull
        private String orderCode;
        @NotNull
        private String importDate;
        @NotNull
        private String productCode;
        @NotNull
        private Long quantity;
        @NotNull
        private Long price;
        @NotNull
        private Long shipFee;
        private String status;
        private String note;
    }
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateImport {
        private String shipCode;
        private String orderCode;
        private String importDate;
        private String productCode;
        private Long quantity;
        private Long price;
        private Long shipFee;
        private String status;
        private String note;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class deleteImport {
        private Long id;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MultipleImport {
        private List<ImportDto> imports;
        private long importCount;
    }
}
