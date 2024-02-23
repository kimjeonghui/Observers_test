package com.posco.invoiceservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@Getter
@Builder
public class InvoiceDTO {
    @NotNull
    private String ovsCd;               // 사무실 코드
    @NotNull
    private String fiscalMonth;  // 회계 년월
    @NotNull
    private LocalDate txDate;       // 거래 일자
    @NotNull
    private String store;               // 거래 처명

    private String depCurr;             // 입금 통화
    private BigDecimal deposit;         // 입금 금액
    private String wdCurr;              // 출금 통화
    private BigDecimal withdrawal;      // 출금 금액
    @NotNull
    private String tranCd;             // 식별 코드
    @NotNull
    private String description;         // 거래 내역
}
