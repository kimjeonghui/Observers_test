package com.posco.ocrservice.dto.request;

import com.posco.ocrservice.entity.OcrDetailEntity;
import com.posco.ocrservice.entity.OcrEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class OcrDetailDTO {
    private Long ocrDetailId;       // 거래 내역 id
    private String description;     // 상품명
    private Double unitPrice;       // 단품 금액
    private Double sumPrice;        // 상품 총 금액
    private Long count;             // 개수

    public static OcrDetailDTO toDTO(OcrDetailEntity ocrDetailEntity) {
        return OcrDetailDTO.builder()
                .ocrDetailId(ocrDetailEntity.getOcrDetailId())
                .description(ocrDetailEntity.getDescription())
                .unitPrice(ocrDetailEntity.getUnitPrice())
                .sumPrice(ocrDetailEntity.getSumPrice())
                .count(ocrDetailEntity.getCount())
                .build();
    }
}
