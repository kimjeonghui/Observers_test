package com.posco.summaryservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_accounting_slip")
public class AccountingSlipEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountSlipId;

    @Column(nullable = false)
    private String tranCd;

    @Column(nullable = false)
    private Long drCr;

    @Column(nullable = false)
    private Long tranNum;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String currCode;

    @Column(nullable = false)
    private BigDecimal krwAmount;

    @Column(nullable = false)
    private Float exchangeRate;

    @Column(nullable = false)
    private String ovsCd;

    @Column(nullable = false)
    private String account;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "invoice_num", insertable = false, updatable = false, nullable = false)
    private String invoiceNum;

    @Column
    private LocalDateTime txDate;

    @ManyToOne(targetEntity = AccountingSlipInvoiceNumEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_num")
    private AccountingSlipInvoiceNumEntity accountingSlipInvoiceNumEntity;
}
