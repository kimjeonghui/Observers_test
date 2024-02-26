package com.posco.ocrservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.posco.ocrservice.dto.request.OcrDetailDTO;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "pos_ocr_detail")
public class OcrDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ocrDetailId;       // 상품 내역 ID

    // entity
    @Setter
    @ManyToOne(targetEntity = OcrEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ocr_id")
    @JsonBackReference
    private OcrEntity ocrEntity;

//    @Column(nullable = false)
    private String description;     // 상품명

//    @Column(nullable = true)
    private Double unitPrice;       // 단품 금액

//    @Column(nullable = false)
    private Double sumPrice;        // 상품 별 금액

    private Long count;             // 수량

    public static OcrDetailDTO toDTO(OcrDetailEntity ocrDetailEntity) {
        return OcrDetailDTO.builder()
                .description(ocrDetailEntity.getDescription())
                .unitPrice(ocrDetailEntity.getUnitPrice())
                .sumPrice(ocrDetailEntity.getSumPrice())
                .count(ocrDetailEntity.getCount())
                .build();
    }

    @Override
    public String toString() {
        return "ReceiptOCR { \n" +
                "description = " + description + "\n" + "unitPrice = " + unitPrice + "\n" + "sumPrice = " + sumPrice + "\n" + "count = " + count + " }";
    }
}
