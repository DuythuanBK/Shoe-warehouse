package com.shoes.warehoue.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderParam extends BaseParam {
    private String status;
    private String phoneNumber;
    private String customerName;
    private String productCode;
}
