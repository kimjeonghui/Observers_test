package com.posco.accountingservice.repository;

import com.posco.accountingservice.entity.AccountingSlipInvoiceNumEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountingSlipInvoiceNumRepository extends JpaRepository<AccountingSlipInvoiceNumEntity, String> {
    Long countByFiscalMonthIs(String fiscalMonth);
    Optional<AccountingSlipInvoiceNumEntity> findByInvoiceNum(String invoiceNum);
    void deleteAllByOvsCdAndFiscalMonth(String ovsCd, String fiscalMonth);

}
