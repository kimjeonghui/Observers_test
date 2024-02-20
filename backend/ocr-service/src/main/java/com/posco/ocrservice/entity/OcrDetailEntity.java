package com.posco.ocrservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "pos_ocr_detail")
public class OcrDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ocrDetailId;       // 거래내용 ID

    @Column(name = "ocr_id", insertable = false, updatable = false, nullable = false)
    private Long ocrId;             // OCR ID

    @ManyToOne(targetEntity = OcrEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ocr_id")
    @JsonBackReference
    private OcrEntity ocrEntity;

    @Column(nullable = false)
    private String description;     // 상품명

    @Column(nullable = false)
    private BigDecimal amount;      // 금액

    private int count;              // 수량
}
