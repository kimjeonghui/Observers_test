package com.posco.summaryservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class SummaryContentDTO {
    private Long summaryContentId;
    private String majorCt;         // 대분류
    private String mediumCt;        // 중분류
    private String minorCt;         // 소분류
    private BigDecimal loc;         // 현지 통화 금액
    private BigDecimal trans;       // 송금 통화 금액
    private String tranCd;          // 식별코드
    private String note;            // 비고
}
