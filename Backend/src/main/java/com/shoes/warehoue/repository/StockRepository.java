package com.shoes.warehoue.repository;

import com.shoes.warehoue.entity.StockEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<StockEntity, Long> {

    Page<StockEntity> findAllByProductCode(String code, Pageable pageable);

    Optional<StockEntity> findByProductCode(String productCode);

    @Query("SELECT SUM(s.quantity) FROM StockEntity s WHERE s.productCode = :productCode")
    Long getTotalQuantityByProductCode(@Param("productCode") String productCode);
}
