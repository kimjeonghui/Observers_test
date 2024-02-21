package com.posco.invoiceservice.repository;

import com.posco.invoiceservice.entity.SummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SummaryRepository extends JpaRepository<SummaryEntity, String>, SummaryRepositoryCustom {
    SummaryEntity findByFiscalMonth(LocalDateTime fiscalMonth);

    List<SummaryEntity> findAllByOvsCd(String ovsCd);
}
