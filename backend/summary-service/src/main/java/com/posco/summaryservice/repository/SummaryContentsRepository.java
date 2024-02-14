package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.SummaryContentsEntity;
import com.posco.summaryservice.entity.SummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SummaryContentsRepository extends JpaRepository<SummaryContentsEntity, Long> {
    SummaryContentsEntity findByTranCd(String tranCd);
}
