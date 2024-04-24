package com.shoes.warehoue.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ImportParam extends BaseParam {
    private String shipCode;
    private String orderCode;
    private String importDate;
    private String productCode;
    private String status;
}
