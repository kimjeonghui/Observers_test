package com.posco.ocrservice.repository;

import com.posco.ocrservice.entity.OcrEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OcrRepository extends CrudRepository<OcrEntity, Long> {
//    List<OcrEntity> findAllByOcrId(String ocrId);
}
