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
@Table(name = "pos_ovs_accounting_slip")
public class AccountingSlipEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountSlipId; //식별자

    @Column(nullable = false)
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

    @Column(nullable = false)
    private Float exchangeRate; //환율

    @Column(nullable = false)
    private String ovsCd; //사무소코드

    @Column(nullable = false)
    private String account; //계정코드

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description; //거래내역

    @Column
    private LocalDate txDate; //거래일자

    @Column
    private String groupId; //OAM-YYMM-부서코드

    @ManyToOne(targetEntity = AccountingSlipInvoiceNumEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_num")
    private AccountingSlipInvoiceNumEntity accountingSlipInvoiceNumEntity;  //송장번호

    @OneToOne(mappedBy = "accountingSlip", cascade = CascadeType.ALL, orphanRemoval = true)
    private AccountSlipHeaderEntity accountSlipHeader; //헤더

    @OneToOne(mappedBy = "accountingSlip", cascade = CascadeType.ALL, orphanRemoval = true)
    private AccountingSlipLineEntity accountingSlipLineEntity;
}