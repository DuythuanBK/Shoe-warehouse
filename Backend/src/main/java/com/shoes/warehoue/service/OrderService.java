package com.shoes.warehoue.service;

import com.shoes.warehoue.dto.CustomerDto;
import com.shoes.warehoue.dto.OrderDto;
import com.shoes.warehoue.entity.*;
import com.shoes.warehoue.exception.AppException;
import com.shoes.warehoue.exception.Error;
import com.shoes.warehoue.model.OrderParam;
import com.shoes.warehoue.repository.CustomerRepository;
import com.shoes.warehoue.repository.OrderRepository;

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
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StockRepository stockRepository;

    public void createOrder(OrderDto dto) {
        ProductEntity productEntity = productRepository.findByCode(dto.getProductCode()).orElseThrow(
                () -> new AppException(new Error("Mã sản phẩm không tìm thấy", HttpStatus.NOT_FOUND)));


        StockEntity stockEntity = stockRepository.findByProductCode(dto.getProductCode()).orElse(null);
        if(stockEntity == null) {
            throw new AppException(new Error("Không tìm thấy sản phẩm trong kho", HttpStatus.BAD_REQUEST));
        }

        if(stockEntity.getQuantity() < dto.getQuantity()) {
            throw new AppException(new Error("Vượt quá số lượng trong kho", HttpStatus.BAD_REQUEST));
        }

        stockEntity.setQuantity(stockEntity.getQuantity() - dto.getQuantity());

        stockRepository.save(stockEntity);

        OrderEntity entity = mapper.map(dto, OrderEntity.class);
        CustomerEntity customerEntity = mapper.map(dto.getCustomer(), CustomerEntity.class);
        customerEntity = customerRepository.save(customerEntity);
        entity.setCustomerId(customerEntity.getId());
        orderRepository.save(entity);
    }

    public void updateOrder(OrderDto dto) {
        OrderEntity entity = orderRepository.findById(dto.getId())
                .orElseThrow(() -> new AppException(new Error("order not found", HttpStatus.NOT_FOUND)));

        CustomerEntity customerEntity = customerRepository.findById(dto.getCustomer().getId())
                .orElseThrow(() -> new AppException(new Error("customer not found", HttpStatus.NOT_FOUND)));



        mapper.map(dto, entity);
        mapper.map(dto.getCustomer(), customerEntity);
        customerRepository.save(customerEntity);
        orderRepository.save(entity);
    }

    public void deleteOrder(OrderDto dto) {
        OrderEntity entity = orderRepository.findById(dto.getId())
                .orElseThrow(() -> new AppException(new Error("order not found", HttpStatus.NOT_FOUND)));

        orderRepository.delete(entity);
    }

    public OrderDto.MultipleOrders getOrders(OrderParam param) {
        Pageable pageable = null;
        if(param.getOffset() != null) {
            pageable = PageRequest.of(param.getOffset(), param.getLimit());
        }
        Page<OrderEntity> page;
        // Create an ExampleMatcher
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths("limit", "offset")
                .withIgnoreNullValues()
                .withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        OrderEntity entityMatcher = mapper.map(param, OrderEntity.class);
        // Create an Example based on the non-null fields of orderParam
        Example<OrderEntity> example = Example.of(entityMatcher, matcher);
        page = orderRepository.findAll(example, pageable);

        List<OrderEntity> orderEntities = page.getContent();
        long orderCount = page.getTotalElements();

        List<OrderDto> orderDtos = orderEntities.stream().map(this::convertToDto).collect(Collectors.toList());

        OrderDto.MultipleOrders multipleOrders = new OrderDto.MultipleOrders();
        multipleOrders.setOrderCount(orderCount);
        multipleOrders.setOrders(orderDtos);

        return multipleOrders;

    }

    private OrderDto convertToDto(OrderEntity entity) {
        OrderDto dto = mapper.map(entity, OrderDto.class);
        CustomerEntity customerEntity = customerRepository.findById(entity.getCustomerId()).orElse(null);
        CustomerDto customerDto = mapper.map(customerEntity, CustomerDto.class);
        dto.setCustomer(customerDto);
        return dto;
    }
}
