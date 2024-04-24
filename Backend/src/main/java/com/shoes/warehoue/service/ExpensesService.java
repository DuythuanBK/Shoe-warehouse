package com.shoes.warehoue.service;

import com.shoes.warehoue.dto.ExpensesDto;
import com.shoes.warehoue.entity.ExpensesEntity;
import com.shoes.warehoue.exception.AppException;
import com.shoes.warehoue.exception.Error;
import com.shoes.warehoue.model.ExpensesParam;
import com.shoes.warehoue.repository.ExpensesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpensesService {
    @Autowired
    private ExpensesRepository expensesRepository;

    @Autowired
    private ModelMapper mapper;

    public void createExpenses(ExpensesDto dto) {
        ExpensesEntity entity = mapper.map(dto, ExpensesEntity.class);
        expensesRepository.save(entity);
    }

    public void updateExpenses(ExpensesDto dto) {
        ExpensesEntity entity = expensesRepository.findById(dto.getId())
                .orElseThrow(() -> new AppException(new Error("Expense not found", HttpStatus.NOT_FOUND)));

        if(dto.getTotal() != null) {
            entity.setTotal(dto.getTotal());
        }

        if(dto.getNote() != null) {
            entity.setNote(dto.getNote());
        }

        entity.setDate(dto.getDate());

        expensesRepository.save(entity);
    }

    public ExpensesDto.MultipleExpenses getAllExpenses(ExpensesParam param) {
        Pageable pageable = null;
        if(param.getOffset() != null) {
            pageable = PageRequest.of(param.getOffset(), param.getLimit());
        }
        Page<ExpensesEntity> page;
        if(param.getDate() != null) {
            page = expensesRepository.findAllByDate(param.getDate(), pageable);
        } else {
            page = expensesRepository.findAll(pageable);
        }
        List<ExpensesEntity> expensesEntityList = page.getContent();
        long pageCount = page.getTotalElements();
        List<ExpensesDto> expensesDtoList = expensesEntityList.stream().map(e -> mapper.map(e, ExpensesDto.class)).collect(Collectors.toList());

        ExpensesDto.MultipleExpenses multipleExpenses = new ExpensesDto.MultipleExpenses();
        multipleExpenses.setExpensesList(expensesDtoList);
        multipleExpenses.setExpensesCount(pageCount);
        return multipleExpenses;
    }

    public void deleteExpenses(ExpensesDto dto) {
        ExpensesEntity entity = expensesRepository.findById(dto.getId())
                .orElseThrow(() -> new AppException(new Error("Expense not found", HttpStatus.NOT_FOUND)));
        expensesRepository.delete(entity);
    }
}
