package com.posco.summaryservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class SummaryResponseDTO {
    private String ovsCd;
    private String ovsName;
    private LocalDateTime fiscalMonth;
    private String majorCt;         // 대분류
    private String mediumCt;        // 중분류
    private String minorCt;         // 소분류
    private String locCurr;         // 현지 통화
    private BigDecimal loc;         // 현지 통화 금액
    private String transCurr;       // 송금 통화
    private BigDecimal trans;       // 송금 통화 금액
    private String note;            // 비고
}
