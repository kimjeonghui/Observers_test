package com.posco.accountingservice.repository;

import com.posco.accountingservice.entity.AccountingSlipInvoiceNumEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountingSlipInvoiceNumRepository extends JpaRepository<AccountingSlipInvoiceNumEntity, String> {
}
