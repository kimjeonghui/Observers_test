package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.SummaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SummaryRepository extends JpaRepository<SummaryEntity, String>, SummaryRepositoryCustom {
    SummaryEntity findByName(String name);
    void deleteByName(String name);
}
