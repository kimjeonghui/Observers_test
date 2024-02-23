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
    private Long accountSlipLineId; //라인발번

    @OneToOne(targetEntity = AccountingSlipInvoiceNumEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "account_slip_header")
    private AccountSlipHeaderEntity accountHeader; //헤더발번

    @Column(nullable = false)
    @ColumnDefault("ITEM")
    private String lineTypeLookupCode; //라인 타입 조회 코드
    @Column(nullable = false)
    private BigDecimal amount; //금액
    @Column(nullable = false)
    private LocalDateTime accountingDate; //회계반영일
    @Column(nullable = false)
    private String description; //적요
    @Column(nullable = false)
    private String distCodeConcatenated;
    private String attribute15;//송장번호
    @Column(nullable = false)
    @ColumnDefault("4")
    private Integer ordId;

    @OneToOne(targetEntity= AccountingSlipEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "account_slip_id")
    private AccountingSlipEntity accountingSlip;
//    @ManyToOne
//    @JoinColumn(name ="accounting_slip_invoice_num")
//    private AccountingSlipInvoiceNumEntity accountingSlipInvoiceNum;

}
