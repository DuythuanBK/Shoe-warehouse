package com.shoes.warehoue.repository;

import com.shoes.warehoue.dto.ProductDto;
import com.shoes.warehoue.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductQuantityRepository extends JpaRepository<ProductEntity, Long> {
    @Query( value = "select p.id, p.code, p.image, p.note, t.q1 as importQuantity, t.q2 as stockQuantity from product p " +
            "left join (select p.code, SUM(i.quantity) as q1, SUM(s.quantity) as q2 from product p " +
            "          left join import i on p.code = i.product_code " +
            "          left join stock s on p.code = s.product_code " +
            "where i.status in ('Đã nhập hàng', 'Hàng đang về') " +
            "group by  p.code) t on p.code = t.code;", nativeQuery = true)
    Page<ProductDto.ProductQuantity> findProductQuantity(Pageable pageable);
}
