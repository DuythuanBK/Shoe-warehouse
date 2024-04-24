package com.shoes.warehoue.controller;

import com.shoes.warehoue.dto.ExpensesDto;
import com.shoes.warehoue.model.ExpensesParam;
import com.shoes.warehoue.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expenses")
@CrossOrigin("*")
public class ExpensesController {
    @Autowired
    private ExpensesService expensesService;

    @PostMapping
    public void createExpenses(@RequestBody ExpensesDto dto) {
        expensesService.createExpenses(dto);
    }

    @PutMapping
    public void updateExpenses(@RequestBody ExpensesDto dto) {
        expensesService.createExpenses(dto);
    }

    @DeleteMapping
    public void deleteExpenses(@RequestBody ExpensesDto dto) {
        expensesService.deleteExpenses(dto);
    }

    @GetMapping
    public ExpensesDto.MultipleExpenses getExpenses(@ModelAttribute ExpensesParam param) {
        return expensesService.getAllExpenses(param);
    }

}
