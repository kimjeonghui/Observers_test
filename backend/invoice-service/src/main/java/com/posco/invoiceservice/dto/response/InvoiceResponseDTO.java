package com.posco.invoiceservice.dto.response;

import com.posco.invoiceservice.entity.InvoiceDataEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class InvoiceResponseDTO {
    private Long invoiceId;            // 거래 내역 id
    private String ovsCd;               // 사무실 코드
    private String fiscalMonth;  // 회계 년월
    private LocalDate txDate;       // 거래 일자
    private String store;               // 거래 처명
    private String depCurr;             // 입금 통화
    private BigDecimal deposit;         // 입금 금액
    private String wdCurr;              // 출금 통화
    private BigDecimal withdrawal;      // 출금 금액
    private String tranCd;             // 식별 코드
    private String description;         // 거래 내역

    private BigDecimal transAmount;     // 환산 금액
    private String status;              // 상태
    private Long ocrId;                 // ocr 연결 id
    private List<EvidenceDTO> evidenceDirs;   // 증빙 자료 경로들

    public static InvoiceResponseDTO toDTO(InvoiceDataEntity invoiceDataEntity){
        return InvoiceResponseDTO.builder()
                .invoiceId(invoiceDataEntity.getInvoiceDataId())
                .ovsCd(invoiceDataEntity.getOvsCd())
                .fiscalMonth(invoiceDataEntity.getFiscalMonth())
                .description(invoiceDataEntity.getDescription())
                .depCurr(invoiceDataEntity.getDepCurr())
                .tranCd(invoiceDataEntity.getTranCd())
                .status(invoiceDataEntity.getStatus())
                .txDate(invoiceDataEntity.getTxDate())
                .store(invoiceDataEntity.getStore())
                .ocrId(invoiceDataEntity.getOcrId())
                .wdCurr(invoiceDataEntity.getWdCurr())
                .withdrawal(invoiceDataEntity.getWithdrawal())
                .deposit(invoiceDataEntity.getDeposit())
                .build();
    }
}


