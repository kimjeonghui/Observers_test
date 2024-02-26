package com.posco.accountingservice.repository;

import com.posco.accountingservice.entity.AccountSlipHeaderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountingSlipHeaderRepository extends JpaRepository<AccountSlipHeaderEntity, Long> {
}
