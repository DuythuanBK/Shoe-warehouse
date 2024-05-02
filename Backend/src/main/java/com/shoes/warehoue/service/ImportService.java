package com.shoes.warehoue.service;

import com.shoes.warehoue.dto.ImportDto;
import com.shoes.warehoue.entity.ImportEntity;
import com.shoes.warehoue.entity.ProductEntity;
import com.shoes.warehoue.entity.StockEntity;
import com.shoes.warehoue.exception.AppException;
import com.shoes.warehoue.exception.Error;
import com.shoes.warehoue.model.ImportParam;
import com.shoes.warehoue.repository.ImportRepository;
import com.shoes.warehoue.repository.ProductRepository;
import com.shoes.warehoue.repository.StockRepository;
import com.shoes.warehoue.util.AppConstant;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImportService {
    @Autowired
    private ImportRepository importRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper mapper;

    public void createImportInfo(ImportDto.CreateImport dto) {
        productRepository.findByCode(dto.getProductCode()).orElseThrow(
                () -> new AppException(new Error("Mã sản phẩm không tìm thấy", HttpStatus.NOT_FOUND)));
        ImportEntity entity = mapper.map(dto, ImportEntity.class);
        if(dto.getStatus().equals(AppConstant.ImportStatus.NHAP_KHO) && dto.getQuantity() != null) {
            if(dto.getQuantity() < 0) {
                throw new AppException(new Error("Số lượng không phù hợp", HttpStatus.INTERNAL_SERVER_ERROR));
            }
            updateStockQuantity(dto.getProductCode(), dto.getQuantity());
        }
        importRepository.save(entity);
    }

    private void updateStockQuantity(String productCode, Long quantity) {
        StockEntity stockEntity = stockRepository.findByProductCode(productCode).orElse(null);
        if(stockEntity == null) {
            stockEntity = new StockEntity();
            stockEntity.setQuantity(quantity);
            stockEntity.setProductCode(productCode);
        } else {
            Long preQuantity = stockEntity.getQuantity();
            stockEntity.setQuantity(preQuantity + quantity);
        }
        stockRepository.save(stockEntity);
    }

    public void deleteImportInfo(ImportDto.deleteImport dto) {
        ImportEntity entity = importRepository.findById(dto.getId())
                .orElseThrow(() -> new AppException(new Error("Hàng đang nhập không tìm thấy", HttpStatus.NOT_FOUND)));
        importRepository.delete(entity);
    }

    public void updateImportInfo(ImportDto dto) {
        ImportEntity entity = importRepository.findById(dto.getId())
                .orElseThrow(() -> new AppException(new Error("Hàng đang nhập không tìm thấy", HttpStatus.NOT_FOUND)));

        if(dto.getStatus().equals(AppConstant.ImportStatus.NHAP_KHO)
                && !entity.getStatus().equals(AppConstant.ImportStatus.NHAP_KHO)
                && dto.getQuantity() != null) {
            updateStockQuantity(dto.getProductCode(), dto.getQuantity());
        }

        if(entity.getStatus().equals(AppConstant.ImportStatus.NHAP_KHO)
            && !dto.getStatus().equals(AppConstant.ImportStatus.NHAP_KHO)
            && dto.getQuantity() != null)  {
            updateStockQuantity(dto.getProductCode(), -dto.getQuantity());
        }
        mapper.map(dto, entity);
        importRepository.save(entity);
    }

    public ImportDto.MultipleImport getImportList(ImportParam param) {
        Pageable pageable = null;
        if(param.getOffset() != null) {
            pageable = PageRequest.of(param.getOffset(), param.getLimit());
        }
        // Create an ExampleMatcher
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths("limit", "offset")
                .withIgnoreNullValues()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        ImportEntity entityMatcher = mapper.map(param, ImportEntity.class);
        // Create an Example based on the non-null fields of orderParam
        Example<ImportEntity> example = Example.of(entityMatcher, matcher);
        Page<ImportEntity> page = importRepository.findAll(example ,pageable);

        List<ImportEntity> importEntities = page.getContent();
        long count = page.getTotalElements();

        List<ImportDto> dtos = importEntities.stream().map(e -> mapper.map(e, ImportDto.class)).collect(Collectors.toList());

        ImportDto.MultipleImport multipleImport = new ImportDto.MultipleImport();
        multipleImport.setImportCount(count);
        multipleImport.setImports(dtos);

        return multipleImport;

    }
}
