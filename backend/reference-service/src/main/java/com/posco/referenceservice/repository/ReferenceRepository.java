package com.posco.referenceservice.repository;

import com.posco.referenceservice.entity.ReferenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferenceRepository extends JpaRepository<ReferenceEntity, String>, ReferenceRepositoryCustom {
    // You can add custom queries or methods if needed
    ReferenceEntity findByOvsCd(String ovsCd);

}
