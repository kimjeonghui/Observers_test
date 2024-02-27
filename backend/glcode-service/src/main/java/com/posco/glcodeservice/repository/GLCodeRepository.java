package com.posco.glcodeservice.repository;

import com.posco.glcodeservice.entity.GLCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GLCodeRepository extends JpaRepository<GLCodeEntity, String>, GLCodeRepositoryCustom {

    GLCodeEntity findByGlCodeId(Long glCodeId);
    GLCodeEntity findByTranCd(String tranCd);
    List<GLCodeEntity> findByMajorCt(String majorCt);

}
