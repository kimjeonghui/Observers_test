package com.posco.invoiceservice.repository;

import com.posco.invoiceservice.entity.InvoiceDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceDataEntity, String> {
    InvoiceDataEntity findByFiscalMonth(LocalDateTime fiscalMonth);

    static List<InvoiceDataEntity> findAllByOvsCd(String ovsCd);
}