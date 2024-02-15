package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.GLCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GLCodeRepository extends JpaRepository<GLCodeEntity, String> {
}
