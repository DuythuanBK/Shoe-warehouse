package com.shoes.warehoue.service;

import com.shoes.warehoue.dto.StockDto;
import com.shoes.warehoue.entity.StockEntity;
import com.shoes.warehoue.model.ProductParam;
import com.shoes.warehoue.repository.StockRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

}
