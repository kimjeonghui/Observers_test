package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.SummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface SummaryRepository extends JpaRepository<SummaryEntity, String>, SummaryRepositoryCustom {
    SummaryEntity findByFiscalMonth(LocalDateTime fiscalMonth);
}
