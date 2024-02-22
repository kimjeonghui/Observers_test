package com.posco.glcodeservice.repository;

import com.posco.glcodeservice.entity.GLCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GLCodeRepository extends JpaRepository<GLCodeEntity, String>, GLCodeRepositoryCustom {

    GLCodeEntity findByTransCd(String transCd);

    GLCodeEntity findByMajorCt(String majorCt);

}
