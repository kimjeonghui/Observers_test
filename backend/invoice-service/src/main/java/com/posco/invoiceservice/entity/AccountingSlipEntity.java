package com.posco.invoiceservice.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_accounting_slip")
public class AccountingSlipEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountSlipId; //식별자
    @Column
    private String fiscalMonth;
    @Column(nullable = false, name = "tx_cd")
    private String txCd; //삭별코드

    @Column(nullable = false)
    private Long drCr; //차대

    @Column(nullable = false)
    private Long txNum; //거래순번

    @Column(nullable = false)
    private BigDecimal amount; //금액

    @Column(nullable = false)
    private String currCode; //통화코드

    @Column(nullable = false)
    private BigDecimal krwAmount; //원화금액

    //@Column(nullable = false)
    @Column
    private Float exchangeRate; //환율

    @Column(nullable = false)
    private String ovsCd; //사무소코드

    @Column(nullable = false)
    private String account; //계정코드

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description; //거래내역

    @Column
    private LocalDate txDate; //거래일자

    @ManyToOne(targetEntity = AccountingSlipInvoiceNumEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_num")
    @Getter @Setter
    private AccountingSlipInvoiceNumEntity accountingSlipInvoiceNumEntity;  //송장번호

//    @Getter @Setter
//    @OneToOne(mappedBy = "accountingSlip", cascade = CascadeType.ALL, orphanRemoval = true)
//    private AccountSlipHeaderEntity accountSlipHeader; //헤더
//
//    @Getter @Setter
//    @OneToOne(mappedBy = "accountingSlip", cascade = CascadeType.ALL, orphanRemoval = true)
//    private AccountingSlipLineEntity accountingSlipLineEntity;


}