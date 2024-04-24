package com.shoes.warehoue.repository;

import com.shoes.warehoue.entity.ProductEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    public Optional<ProductEntity> findById(Long id);

    Page<ProductEntity> findByCode(String code, Pageable pageable);

    Optional<ProductEntity> findByCode(String productCode);

    @Query( value = "select p.id, p.code, p.image, p.note from product p join \n" +
            "(select p.code from product p\n" +
            "          left join import i on p.code = i.product_code\n" +
            "          left join stock s on p.code = s.product_code\n" +
            "where i.status in ('Đã nhập hàng', 'Hàng đang về') \n" +
            "group by  p.code ) p2 on p.code = p2.code ", nativeQuery = true)
    Page<ProductEntity> findProductQuantity(Example<ProductEntity> example, Pageable pageable);
}
