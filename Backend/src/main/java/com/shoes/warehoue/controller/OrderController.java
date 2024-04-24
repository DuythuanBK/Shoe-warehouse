package com.shoes.warehoue.controller;

import com.shoes.warehoue.dto.OrderDto;
import com.shoes.warehoue.model.OrderParam;
import com.shoes.warehoue.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public void createOrder(@RequestBody OrderDto dto) {
        orderService.createOrder(dto);
    }

    @PutMapping
    public void updateOrder(@RequestBody OrderDto dto) {
        orderService.updateOrder(dto);
    }

    @DeleteMapping
    public void deleteOrder(@RequestBody OrderDto dto) {
        orderService.deleteOrder(dto);
    }

    @GetMapping
    public OrderDto.MultipleOrders getAllOrders(@ModelAttribute OrderParam param) {
        return orderService.getOrders(param);
    }
}
