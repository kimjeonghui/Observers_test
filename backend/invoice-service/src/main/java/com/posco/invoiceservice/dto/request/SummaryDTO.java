package com.posco.invoiceservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Builder
public class SummaryDTO {
    private Long invoiceId;             // 거래 내역 id
    @NotNull
    private String ovsCd;               // 사무실 코드
    @NotNull
    private String ovsName;             // 사무실 이름
    @NotNull
    private LocalDateTime txDate;       // 거래 일자

    private String store;               // 거래 처명
    private String depCurr;             // 입금 통화
    private BigDecimal deposit;         // 입금 금액
    private String wdCurr;              // 출금 통화
    private BigDecimal withdrawal;      // 출금 금액
    private String description;         // 거래 내역
    private BigDecimal transAmount;     // 환산 금액
    private String tranCd;             // 식별 코드
    private LocalDateTime fiscalMonth;  // 회계 년월
}
