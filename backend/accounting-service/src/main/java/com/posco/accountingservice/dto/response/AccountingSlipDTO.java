package com.posco.accountingservice.dto.response;

import com.posco.accountingservice.entity.AccountingSlipEntity;
import com.posco.accountingservice.entity.InvoiceDataEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AccountingSlipDTO {
    private Long accountSlipId; //식별자
    private String txCd; //삭별코드
    private Long drCr; //차대
    private Long txNum; //거래순
    private BigDecimal amount; //금액
    private String currCode; //통화코드
    private BigDecimal krwAmount; //원화금액
    private Float exchangeRate; //환율
    private String ovsCd; //사무소코드
    private String account; //계정코드
    private String description; //거래내역
    private LocalDate txDate; //거래일자
    private String groupId; //OAM-YYMM-부서코드
    private String invoiceNum;
    private String createdBy; //누가 만든 거래인지
    private LocalDateTime createdDate;

    public static AccountingSlipDTO toDto(AccountingSlipEntity accountingSlip, InvoiceDataEntity invoiceDataEntity){
        return AccountingSlipDTO.builder().account(accountingSlip.getAccount())
                .accountSlipId(accountingSlip.getAccountSlipId())
                .txCd(accountingSlip.getTxCd())
                .drCr(accountingSlip.getDrCr())
                .txNum(accountingSlip.getTxNum())
                .amount(accountingSlip.getAmount())
                .currCode(accountingSlip.getCurrCode())
                .krwAmount(accountingSlip.getKrwAmount())
                .exchangeRate(accountingSlip.getExchangeRate())
                .description(accountingSlip.getDescription())
                .txDate(accountingSlip.getTxDate())
                .invoiceNum(accountingSlip.getAccountingSlipInvoiceNumEntity().getInvoiceNum())
                .createdBy(invoiceDataEntity.getCreatedBy())
                .createdDate(invoiceDataEntity.getCreatedDate())
                .ovsCd(invoiceDataEntity.getOvsCd())
                .groupId("OAM"+"-"+accountingSlip.getFiscalMonth()+"-"+accountingSlip.getOvsCd())
                .build();
    }

}
