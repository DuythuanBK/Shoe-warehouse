package com.shoes.warehoue.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpensesParam extends BaseParam{
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private String date;
}
