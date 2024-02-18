package com.posco.accountingservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_ap_inv_line")
public class AccountingSlipLineEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountSlipId;

    @ManyToOne(targetEntity = AccountingSlipInvoiceNumEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "account_slip_header")
    private AccountSlipHeaderEntity accountHeader;

    @Column(nullable = false)
    @ColumnDefault("ITEM")
    private String lineTypeLookupCode;
    @Column(nullable = false)
    private BigDecimal amount;
    @Column(nullable = false)
    private LocalDateTime accountingDate;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String distCodeConcatenated;
    private String attribute15 = accountHeader.getInvoiceNum();
    @Column(nullable = false)
    @ColumnDefault("4")
    private Integer ordId;

}
