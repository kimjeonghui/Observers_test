package com.posco.summaryservice.entity;

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
public class AccountingSlipInvoiceNumEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceNum;

    @Column(name = "invoice_data_id", insertable = false, updatable = false)
    private Long invoiceDataId;

    @OneToOne(targetEntity = InvoiceDataEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_data_id")
    private InvoiceDataEntity invoiceDataEntity;

    @OneToMany(mappedBy = "accountingSlipInvoiceNumEntity", cascade = CascadeType.REMOVE)
    private List<AccountingSlipEntity> accountingSlipEntityList;
}
