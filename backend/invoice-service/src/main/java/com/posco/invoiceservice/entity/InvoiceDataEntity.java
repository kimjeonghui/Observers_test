package com.posco.invoiceservice.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
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
    private LocalDate txDate;       // 거래 일자

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
    private String fiscalMonth;         // 회계 년월

    @Column
    @Setter
    private String status;              // 상태

    @Column
    private Long ocrId;                 // OCR ID

    @Column
    private Float exchangeRate;         // 환율;

    @OneToOne(mappedBy = "invoiceDataEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private AccountingSlipInvoiceNumEntity accountingSlipInvoiceNum;                                // 송장 번호(one to one 이라 필요)

    @OneToMany(mappedBy = "invoiceDataEntity", cascade = CascadeType.REMOVE)
    private List<EvidenceDataEntity> evidenceDataEntityList;                                        // 증빙 자료(연결된 거라서 이렇게 씀)
}
