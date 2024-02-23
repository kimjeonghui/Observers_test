package com.posco.accountingservice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_accounting_slip_invoice_num")
public class AccountingSlipInvoiceNumEntity extends BaseEntity{
    @Id
    @Column(name="accounting_slip_invoice_num")
    private String invoiceNum;
    @OneToOne(targetEntity = InvoiceDataEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_data_id")
    private InvoiceDataEntity invoiceDataEntity;
    @Column(nullable = false)
    private String ovsCd;

    @Column(nullable = false)
    private String fiscalMonth;

    @OneToMany(mappedBy = "accountingSlipInvoiceNumEntity", cascade = CascadeType.REMOVE)
    private List<AccountingSlipEntity> accountingSlipEntityList;
    @Column(nullable = false)
    private Long txNum;
}