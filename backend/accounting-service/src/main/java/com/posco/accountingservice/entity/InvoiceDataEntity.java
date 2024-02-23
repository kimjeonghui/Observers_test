package com.posco.accountingservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_invoice_data")   // 거래 자료
public class InvoiceDataEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceDataId;

    @Column
    private Float exchangeRage;
    @Column
    private LocalDate txDate;       //

    @Column
    private String store;               // 거래처명

    @Column
    private String depCurr;             // 입금 통화

    @Column
    private BigDecimal deposit;         // 입금 금액

    @Column
    private String wdCurr;              // 출금 통화

    @Column
    private BigDecimal withdrawal;      // 출금 금액

    @Column(columnDefinition = "TEXT")
    private String description;         // 거래 내역

    @Column
    private BigDecimal transAmount;     // 환산 금액

    @Column
    private String tranCd;              // 식별 코드

    @Column
    private String ovsCd;               // 사무소 코드

    @Column
    private LocalDateTime fiscalMonth;  // 회계 년월

    @Column
    private String status;              // 상태

    @Column
    private Long ocrId;                 // OCR ID

    @OneToOne(mappedBy = "invoiceDataEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private AccountingSlipInvoiceNumEntity accountingSlipInvoiceNum;

    @OneToMany(mappedBy = "invoiceDataEntity", cascade = CascadeType.REMOVE)
    private List<EvidenceDataEntity> evidenceDataEntityList;
}