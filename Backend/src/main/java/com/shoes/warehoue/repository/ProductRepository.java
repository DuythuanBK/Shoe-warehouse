package com.shoes.warehoue.repository;

import com.shoes.warehoue.entity.ProductEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    public Optional<ProductEntity> findById(Long id);

    @Query( value = "select p.id, p.code, p.image, p.note from product p \n" +
            "where p.code like %:productCode%", nativeQuery = true)
    Page<ProductEntity> findByCode(@Param("productCode") String code, Pageable pageable);

    Optional<ProductEntity> findByCode(String productCode);

    @Query( value = "select p.id, p.code, p.image, p.note from product p \n" +
            "join\n" +
            "  (select p.code from product p\n" +
            "    left join imports i on p.code = i.product_code\n" +
            "    where i.status in ('Đã đặt hàng', 'Hàng đang về')\n" +
            "\t  group by  p.code \n" +
            "\tunion \n" +
            "\t  select p.code from product p\n" +
            "  \tleft join stock s on p.code = s.product_code\n" +
            "\t  group by  p.code ) p2 on p.code = p2.code\n" +
            "where p.code like %:productCode%", nativeQuery = true)
    Page<ProductEntity> findProductQuantityLikeCode(@Param("productCode") String productCode, Pageable pageable);

    @Query( value = "select p.id, p.code, p.image, p.note from product p \n" +
            "join\n" +
            "  (select p.code from product p\n" +
            "    left join imports i on p.code = i.product_code\n" +
            "    where i.status in ('Đã đặt hàng', 'Hàng đang về')\n" +
            "\t  group by  p.code \n" +
            "\tunion \n" +
            "\t  select p.code from product p\n" +
            "  \tleft join stock s on p.code = s.product_code\n" +
            "\t  group by  p.code ) p2 on p.code = p2.code\n", nativeQuery = true)
    Page<ProductEntity> findProductQuantity(Pageable pageable);
}
