package com.posco.invoiceservice.repository;


import com.posco.invoiceservice.entity.EvidenceDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvidenceRepository extends JpaRepository<EvidenceDataEntity, Long> {
    List<EvidenceDataEntity> findALLByInvoiceDataId(Long invoiceId);
}
