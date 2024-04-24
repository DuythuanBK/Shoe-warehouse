package com.shoes.warehoue.repository;

import com.shoes.warehoue.entity.ExpensesEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ExpensesRepository extends JpaRepository<ExpensesEntity, Long> {

    Page<ExpensesEntity> findAllByDate(String date, Pageable pageable);
}
