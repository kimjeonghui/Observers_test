package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.SummaryContentsEntity;
import com.posco.summaryservice.entity.SummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface SummaryContentsRepository extends JpaRepository<SummaryContentsEntity, Long> {
    SummaryContentsEntity findByTranCd(String tranCd);

    List<SummaryContentsEntity> findAllBySummaryId(Long SummaryId);
}
