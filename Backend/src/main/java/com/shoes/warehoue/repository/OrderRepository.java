package com.shoes.warehoue.repository;

import com.shoes.warehoue.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Page<OrderEntity> findByProductCode(String productCode, Pageable pageable);
    Page<OrderEntity> findByStatus(String status, Pageable pageable);

}
