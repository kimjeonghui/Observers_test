package com.posco.ocrservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.posco.ocrservice.dto.request.OcrDetailDTO;
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

    @Column(nullable = false)
    private String description;     // 상품명

    @Column(nullable = true)
    private Double unitPrice;       // 단품 금액

    @Column(nullable = false)
    private Double sumPrice;        // 상품 별 금액

    private Long count;             // 수량

    // entity
    @ManyToOne(targetEntity = OcrEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ocr_id")
    @JsonBackReference
    private OcrEntity ocrEntity;

    public static OcrDetailEntity toEntity(OcrDetailDTO ocrDetailDTO) {
        return OcrDetailEntity.builder()
                .ocrDetailId(ocrDetailDTO.getOcrDetailId())
                .description(ocrDetailDTO.getDescription())
                .unitPrice(ocrDetailDTO.getUnitPrice())
                .sumPrice(ocrDetailDTO.getSumPrice())
                .count(ocrDetailDTO.getCount())
                .build();
    }
}
