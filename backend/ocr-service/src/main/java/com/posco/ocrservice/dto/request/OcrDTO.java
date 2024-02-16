package com.posco.ocrservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class OcrDTO {
//    private Long ocrId;                 // OCR 자료 id
    private String storeName;           // 거래처 명
    private String purDate;             // 거래 일자
    private Double totalPrice;          // 총 금액
//    private ArrayList items;            // 상품
}
