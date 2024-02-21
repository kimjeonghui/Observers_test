package com.posco.invoiceservice.repository;

import com.posco.invoiceservice.entity.GLCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GLCodeRepository extends JpaRepository<GLCodeEntity, String> {
}
