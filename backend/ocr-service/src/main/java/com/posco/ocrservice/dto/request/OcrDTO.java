package com.posco.ocrservice.dto.request;

import com.posco.ocrservice.entity.OcrEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class OcrDTO {
//    private Long ocrId;               // OCR 자료 id
    private String storeName;       // 거래처 명
    private String purDate;         // 거래 일자
    private Double totalVal;      // 총 금액

    public static OcrDTO toDTO(OcrEntity ocrEntity) {
        return OcrDTO.builder()
                .storeName(ocrEntity.getStoreName())
                .purDate(ocrEntity.getPurDate())
                .totalVal(ocrEntity.getTotalVal())
                .build();
    }
}
