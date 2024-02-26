package com.posco.ocrservice.dto.request;

import com.posco.ocrservice.entity.OcrEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class OcrDTO {
    private String storeName;       // 거래처 명
    private String purDate;         // 거래 일자
    private Double totalVal;      // 총 금액

    @Override
    public String toString() {
        return "ReceiptOCR { \n" +
                "storeName = " + storeName + "\n" + "purDate = " + purDate + "\n" + "totalVal = " + totalVal + " }";
    }

    public static OcrEntity toEntity(OcrDTO ocrDto) {
        return OcrEntity.builder()
                .purDate(ocrDto.getPurDate())
                .storeName(ocrDto.getStoreName())
                .totalVal(ocrDto.getTotalVal())
                .build();
    }
}
