package com.posco.accountingservice.repository;

import com.posco.accountingservice.entity.InvoiceDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface InvoiceDataRepository extends JpaRepository<InvoiceDataEntity, Long> {
    public List<InvoiceDataEntity> findAllByOvsCdAndFiscalMonth(String ovsCd, String fiscalMonth);
}
