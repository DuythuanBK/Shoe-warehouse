package com.shoes.warehoue.controller;

import com.shoes.warehoue.dto.ProductDto;
import com.shoes.warehoue.model.BaseParam;
import com.shoes.warehoue.model.ProductParam;
import com.shoes.warehoue.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto.Product product) {
        return productService.createProduct(product);
    }

    @PutMapping
    public void updateProduct(@RequestBody ProductDto product) {
        productService.updateProduct(product);
    }

    @GetMapping
    public ProductDto.MultipleProducts getProducts(@ModelAttribute ProductParam param) {
        return productService.getProducts(param);
    }

    @DeleteMapping
    public void deleteProduct(@RequestBody ProductDto dto) {
        productService.deleteProduct(dto);
    }

    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        Resource resource = productService.getImage(imageName);
        return ResponseEntity.ok(resource);
    }

    @GetMapping("/quantity")
    public ProductDto.MultipleProductQuantity getProductQuantity(@ModelAttribute ProductParam param) {
        return productService.getProductQuantity(param);
    }

    @GetMapping("/export_excel")
    public ResponseEntity<Resource> exportProducts(@ModelAttribute ProductParam param) {
        ByteArrayResource resource = productService.exportProducts(param);
        return ResponseEntity.ok()
                .contentLength(resource.contentLength())
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(resource);
    }
}
