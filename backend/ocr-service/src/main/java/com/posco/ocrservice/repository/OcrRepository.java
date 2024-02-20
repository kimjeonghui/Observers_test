package com.posco.ocrservice.repository;

import com.posco.ocrservice.entity.OcrEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OcrRepository extends JpaRepository<OcrEntity, Long> {
    OcrEntity findByFiscalMonth(LocalDateTime fiscalMonth);

    List<OcrEntity> findAllByOvsCd(String ovsCd);
}
