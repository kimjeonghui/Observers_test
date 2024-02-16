package com.posco.ocrservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@AllArgsConstructor
@Getter
@Builder
public class OcrDTO {
    private Long ocrId;                 // OCR 자료 id
    private LocalDateTime purDate;      // 거래 일자
    private String storeName;           // 거래처 명
    private BigDecimal totalPrice;      // 총 금액
}
