package com.shoes.warehoue.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productCode;
    private Long customerId;
    private Long quantity;
    private Long weight;
    private Long price;
    private String shipTime;
    private Date createTime;
    private Date finishTime;
    private String shipService;
    private String status;
    private String note;
}
