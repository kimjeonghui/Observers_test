package com.posco.invoiceservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_evidence_data")
public class EvidenceDataEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evidenceId;

    @Column(nullable = false)
    private String evidenceDir;

    @Column(name = "invoice_data_id", insertable = false, updatable = false)
    private Long invoiceDataId;

    @ManyToOne(targetEntity = InvoiceDataEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_data_id")
    @JsonBackReference
    private InvoiceDataEntity invoiceDataEntity;
}
