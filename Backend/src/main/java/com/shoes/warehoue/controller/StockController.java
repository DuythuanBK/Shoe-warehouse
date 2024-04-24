package com.shoes.warehoue.controller;

import com.shoes.warehoue.dto.StockDto;
import com.shoes.warehoue.model.ProductParam;
import com.shoes.warehoue.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stock")
@CrossOrigin("*")
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping
    public StockDto.MultipleProduct getProducts(@ModelAttribute ProductParam param) {
        return stockService.getStock(param);
    }

    public void deleteStock(@RequestBody StockDto dto) {
    }
}
