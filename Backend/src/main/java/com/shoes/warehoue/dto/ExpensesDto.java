package com.shoes.warehoue.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpensesDto {
    private Long id;
    @NotNull
    private Long total;
    @NotNull
    @JsonFormat(pattern="dd-MM-yyyy")
    private String date;
    private String note;

    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MultipleExpenses {
        private List<ExpensesDto> expensesList;
        private long expensesCount;
    }
}
