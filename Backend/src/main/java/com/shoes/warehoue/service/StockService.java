package com.shoes.warehoue.service;

import com.shoes.warehoue.dto.StockDto;
import com.shoes.warehoue.entity.ProductEntity;
import com.shoes.warehoue.entity.StockEntity;
import com.shoes.warehoue.exception.AppException;
import com.shoes.warehoue.exception.Error;
import com.shoes.warehoue.model.ProductParam;
import com.shoes.warehoue.repository.StockRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private ModelMapper mapper;

    public StockDto.MultipleProduct getStock(ProductParam param) {
        Pageable pageable = null;
        if(param.getOffset() != null) {
            pageable = PageRequest.of(param.getOffset(), param.getLimit());
        }
        Page<StockEntity> page;
        if(param.getCode() != null) {
            page = stockRepository.findAllByProductCode(param.getCode(), pageable);
        } else {
            page = stockRepository.findAll(pageable);
        }

        List<StockEntity> stockEntities = page.getContent();
        long count = page.getTotalElements();

        List<StockDto> dtos = stockEntities.stream().map(e -> mapper.map(e, StockDto.class)).collect(Collectors.toList());

        StockDto.MultipleProduct multipleProduct = new StockDto.MultipleProduct();

        multipleProduct.setStockCount(page.getTotalElements());
        multipleProduct.setStocks(dtos);

        return multipleProduct;
    }

    public ByteArrayResource exportProducts(ProductParam param) {
        List<StockEntity> stockEntities = new ArrayList<>();
        stockEntities = stockRepository.findAll();

        String[] colums = {"Id", "Product Code", "Quantity"};

        // Create a new Workbook
        Workbook workbook = new XSSFWorkbook();

        // Create a Sheet
        Sheet sheet = workbook.createSheet("Sheet1");
        // Write columns
        Row row1 = sheet.createRow(0);
        row1.createCell(0).setCellValue(colums[0]);
        row1.createCell(1).setCellValue(colums[1]);
        row1.createCell(2).setCellValue(colums[2]);

        for(int i = 0; i < stockEntities.size(); i++) {
            Row row = sheet.createRow(i + 1);
            row.createCell(0).setCellValue(stockEntities.get(i).getId());
            row.createCell(1).setCellValue(stockEntities.get(i).getProductCode());
            row.createCell(2).setCellValue(stockEntities.get(i).getQuantity());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            workbook.write(outputStream);
            workbook.close();
        } catch (IOException e) {
            throw new AppException( new Error("Lỗi trong qúa trình ghi file", HttpStatus.INTERNAL_SERVER_ERROR));
        }

        return new ByteArrayResource(outputStream.toByteArray());
    }
}
