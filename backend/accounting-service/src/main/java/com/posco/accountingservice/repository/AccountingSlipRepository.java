package com.posco.accountingservice.repository;

import com.posco.accountingservice.entity.AccountingSlipEntity;
import com.posco.accountingservice.entity.InvoiceDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountingSlipRepository extends JpaRepository<AccountingSlipEntity, Long> {
    public List<AccountingSlipEntity> findByOvsCdAndFiscalMonth(String OvsCd, String fiscalMonth);
}
