package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.SummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface SummaryRepository extends JpaRepository<SummaryEntity, String>, SummaryRepositoryCustom {
    SummaryEntity findByFiscalMonth(String fiscalMonth);

    SummaryEntity findByOvsCdAndFiscalMonth(String ovsCd, String fiscalMonth);
}
