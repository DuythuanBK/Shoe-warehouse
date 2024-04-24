package com.shoes.warehoue.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Imports")
public class ImportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

}
