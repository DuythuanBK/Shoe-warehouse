package com.shoes.warehoue.repository;

import com.shoes.warehoue.entity.ImportEntity;
import com.shoes.warehoue.model.ImportParam;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ImportRepository extends JpaRepository<ImportEntity, Long> {

    Page<ImportEntity> findByProductCode(String productCode, Pageable pageable);

    Page<ImportEntity> findByStatus(String status, Pageable pageable);

    Page<ImportEntity> findByShipCode(String shipCode, Pageable pageable);

    Page<ImportEntity> findByOrderCode(String orderCode, Pageable pageable);

    Page<ImportEntity> findByImportDate(Date importDate, Pageable pageable);

    @Query("SELECT SUM(s.quantity) FROM ImportEntity s WHERE s.productCode = :productCode and s.status in ('Hàng đang về', 'Đã nhập hàng')")
    Long getTotalQuantityByProductCodeInImport(@Param("productCode") String productCode);
}
