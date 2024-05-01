package com.shoes.warehoue.service;

import com.shoes.warehoue.dto.OrderDto;
import com.shoes.warehoue.dto.ProductDto;
import com.shoes.warehoue.entity.OrderEntity;
import com.shoes.warehoue.entity.ProductEntity;
import com.shoes.warehoue.exception.AppException;
import com.shoes.warehoue.exception.Error;
import com.shoes.warehoue.model.ProductParam;
import com.shoes.warehoue.repository.ImportRepository;
import com.shoes.warehoue.repository.ProductRepository;
import com.shoes.warehoue.repository.StockRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Log4j2
public class ProductService {
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private ImportRepository importRepository;
    public ProductDto createProduct(ProductDto.Product product) {
        ProductEntity entity = productRepository.findByCode(product.getCode()).orElse(null);
        if(entity != null) {
            throw new AppException(new Error("Sản phẩm đã tồn tại", HttpStatus.FOUND));
        }
        String imageName = "";
        if(product.getImage() != null) {
            String[] images = product.getImage().split(",");
            String extension = images[0].split("/")[1].split(";")[0];

            imageName = product.getCode() + "." + extension;

            convertBase64ToPng(images[1], "/" + imageName);
        }
        entity = ProductEntity.builder()
                .code(product.getCode())
                .image(imageName)
                .note(product.getNote())
                .build();

        entity = productRepository.save(entity);
        ProductDto dto = new ProductDto();
        mapper.map(entity, dto);
        return dto;
    }
    public void convertBase64ToPng(String base64String, String outputFilePath) {
        try {
            // Decode the Base64 string to byte array
            byte[] imageBytes = Base64.getDecoder().decode(base64String);

            // Write the byte array to a file
            Path outputPath = Paths.get(outputFilePath);
            Files.write(outputPath, imageBytes);
        } catch (IOException e) {
            log.error("Write file unsuccessful");
        }
    }

    public void updateProduct(ProductDto product) {
        ProductEntity entity = productRepository.findById(product.getId())
                .orElseThrow(() -> new AppException(new Error("product not found", HttpStatus.NOT_FOUND)));
        if(product.getCode() != null) {
            entity.setCode(product.getCode());
        }

        if(product.getImage() != null) {
            entity.setNote(product.getImage());
        }

        if(product.getNote() != null) {
            entity.setNote(product.getNote());
        }
        productRepository.save(entity);
    }

    public ProductDto.MultipleProducts getProducts(ProductParam param) {
        Pageable pageable = null;
        if(param.getOffset() != null) {
            pageable = PageRequest.of(param.getOffset(), param.getLimit());
        }
        Page<ProductEntity> page;

        if(param.getCode() != null) {
            page = productRepository.findByCode(param.getCode(), pageable);
        }else {
            page = productRepository.findAll(pageable);
        }
        List<ProductEntity> productEntities = page.getContent();
        ProductDto.MultipleProducts multipleProducts = new ProductDto.MultipleProducts();
        List<ProductDto> productDtos = productEntities.stream().map(this::convertToDto).collect(Collectors.toList());
        multipleProducts.setProducts(productDtos);
        multipleProducts.setProductsCount(page.getTotalElements());
        return multipleProducts;
    }

    public void deleteProduct(ProductDto product) {
        ProductEntity entity = productRepository.findById(product.getId())
                .orElseThrow(() -> new AppException(new Error("product not found", HttpStatus.NOT_FOUND)));
        productRepository.delete(entity);
    }

    private ProductDto convertToDto(ProductEntity entity) {
        ProductDto dto = mapper.map(entity, ProductDto.class);
        return dto;
    }

    public Resource getImage(String imageName) {
        String code = imageName.split("\\.")[0];

        ProductEntity productEntity = productRepository.findByCode(code).orElse(null);

        if(productEntity != null && productEntity.getImage() != null) {
            // Construct the path to the image
            Path imagePath = Paths.get("/", productEntity.getImage());

            // Create a resource from the file system path
            return new FileSystemResource(imagePath.toFile());
        }

        return null;
    }

    public ProductDto.MultipleProductQuantity getProductQuantity(ProductParam param) {
        Pageable pageable = null;
        if(param.getOffset() != null) {
            pageable = PageRequest.of(param.getOffset(), param.getLimit());
        }
        Page<ProductEntity> page;
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths("limit", "offset")
                .withIgnoreNullValues()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        ProductEntity entityMatcher = mapper.map(param, ProductEntity.class);
        // Create an Example based on the non-null fields of orderParam
        Example<ProductEntity> example = Example.of(entityMatcher, matcher);
//        if(param.getCode() != null) {
//            page = productRepository.findByCode(param.getCode(), pageable);
//        }else {
            page = productRepository.findProductQuantity(example, pageable);
//        }
        List<ProductEntity> productEntities = page.getContent();
        List<ProductDto.ProductQuantity> productQuantities = productEntities.stream().map((e) -> {
            return mapper.map(e, ProductDto.ProductQuantity.class);
        }).collect(Collectors.toList());

        for(ProductDto.ProductQuantity p : productQuantities) {
            Long stockQuantity = stockRepository.getTotalQuantityByProductCode(p.getCode());
            Long importQuantity = importRepository.getTotalQuantityByProductCodeInImport(p.getCode());

            p.setStockQuantity(stockQuantity);
            p.setImportQuantity(importQuantity);
        }

        ProductDto.MultipleProductQuantity multipleProducts = new ProductDto.MultipleProductQuantity();
        multipleProducts.setProducts(productQuantities);
        multipleProducts.setProductsCount(page.getTotalElements());
        return multipleProducts;
    }


    public ByteArrayResource exportProducts(ProductParam param) {
        List<ProductEntity> productEntities = new ArrayList<>();
        productEntities = productRepository.findAll();

        String[] colums = {"Id", "Product Code", "Note"};

        // Create a new Workbook
        Workbook workbook = new XSSFWorkbook();

        // Create a Sheet
        Sheet sheet = workbook.createSheet("Sheet1");
        // Write columns
        Row row1 = sheet.createRow(0);
        row1.createCell(0).setCellValue(colums[0]);
        row1.createCell(1).setCellValue(colums[1]);
        row1.createCell(2).setCellValue(colums[2]);

        for(int i = 0; i < productEntities.size(); i++) {
            Row row = sheet.createRow(i + 1);
            row.createCell(0).setCellValue(productEntities.get(i).getId());
            row.createCell(1).setCellValue(productEntities.get(i).getCode());
            row.createCell(2).setCellValue(productEntities.get(i).getNote());
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
