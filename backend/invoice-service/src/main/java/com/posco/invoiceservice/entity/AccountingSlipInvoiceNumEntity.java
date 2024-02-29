package com.posco.invoiceservice.entity;

import lombok.*;
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
    @Column(name = "invoice_num", nullable = false)
    private String invoiceNum;
    @Setter
    @OneToOne(targetEntity = InvoiceDataEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_data_id")
    private InvoiceDataEntity invoiceDataEntity;
    @Column(nullable = false)
    private String ovsCd;

    @Column(nullable = false)
    private String fiscalMonth;

    @Setter
    @OneToMany(mappedBy = "accountingSlipInvoiceNumEntity", cascade = CascadeType.ALL)
    private List<AccountingSlipEntity> accountingSlipEntityList;
    @Column(nullable = false)
    private Long tranNum;
}