package com.posco.ocrservice.repository;

import com.posco.ocrservice.entity.OcrEntity;
import org.springframework.data.repository.CrudRepository;

public interface OcrRepository extends CrudRepository<OcrEntity, Long> {
}
