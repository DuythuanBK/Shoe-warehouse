package com.shoes.warehoue.controller;

import com.shoes.warehoue.dto.StockDto;
import com.shoes.warehoue.model.ProductParam;
import com.shoes.warehoue.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/export_excel")
    public ResponseEntity<Resource> exportProducts(@ModelAttribute ProductParam param) {
        ByteArrayResource resource = stockService.exportProducts(param);
        return ResponseEntity.ok()
                .contentLength(resource.contentLength())
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(resource);
    }
}
