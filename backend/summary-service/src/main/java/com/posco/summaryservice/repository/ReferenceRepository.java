package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.ReferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferenceRepository extends JpaRepository<ReferenceEntity, String> {
    ReferenceEntity findByOvsCd(String ovsCd);
}
