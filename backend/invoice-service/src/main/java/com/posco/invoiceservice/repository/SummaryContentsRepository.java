package com.posco.invoiceservice.repository;

import com.posco.invoiceservice.entity.SummaryContentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface SummaryContentsRepository extends JpaRepository<SummaryContentsEntity, Long> {
    SummaryContentsEntity findByTranCd(String tranCd);

    List<SummaryContentsEntity> findAllBySummaryId(Long SummaryId);
}
