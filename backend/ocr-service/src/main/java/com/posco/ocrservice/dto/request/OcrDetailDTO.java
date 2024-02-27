package com.posco.ocrservice.dto.request;

import com.posco.ocrservice.entity.OcrDetailEntity;
import com.posco.ocrservice.entity.OcrEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class OcrDetailDTO {
    private String description;     // 상품명
    private Double unitPrice;       // 단품 금액
    private Double sumPrice;        // 상품 총 금액
    private Long count;             // 개수
    private Long ocrId;           // ocr id

    public static OcrDetailEntity toEntity(OcrDetailDTO ocrDetailDTO) {
        return OcrDetailEntity.builder()
                .description(ocrDetailDTO.getDescription())
                .unitPrice(ocrDetailDTO.getUnitPrice())
                .sumPrice(ocrDetailDTO.getSumPrice())
                .count(ocrDetailDTO.getCount())
                .build();
    }

    @Override
    public String toString() {
        return "Item { \n" +
                "description = " + description + "\n" + "unitPrice = " + unitPrice + "\n" + "sumPrice = " + sumPrice + "\n" + "count = " + count + " }\n";
    }
}
