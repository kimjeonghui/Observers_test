package com.posco.invoiceservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_accounting_slip_invoice_num")
public class AccountingSlipInvoiceNumEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer num;
    @Column(nullable = false)
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
}