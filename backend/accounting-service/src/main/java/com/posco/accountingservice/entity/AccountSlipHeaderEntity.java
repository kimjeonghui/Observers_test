package com.posco.accountingservice.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_ap_inv_header")
@DynamicInsert
public class AccountSlipHeaderEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceId;
    @Column(nullable = false)
    private String invoiceNum;
    @Column(nullable = false)
    @ColumnDefault("STANDARD")
    private String invoiceTypeLookupCode;
    @Column(nullable = false)
    private LocalDateTime invoiceDate;
    @Column(nullable = false)
    @ColumnDefault("3049")
    private Integer vendorId;
    @Column(nullable = false)
    @ColumnDefault("해외사무소")
    private String vendorName;
    @Column(nullable = false)
    private String vendorSiteCode;
    @Column(nullable = false)
    private String invoiceCurrencyCode;
    @Column(nullable = false)
    private String paymentCurrencyCode;
    @Column(nullable = false)
    @ColumnDefault("0")
    private Integer invoiceAmount;
    @Column(nullable = false)
    private Float exchangeRate;
    @Column(nullable = false)
    @ColumnDefault("1002")
    private String exchangeRateType;
    @Column(nullable = false)
    private LocalDateTime exchangeDate;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    @ColumnDefault("JA.KR.APXINWKB.INVOICES")
    private String globalAttributeCategory;
    @ColumnDefault("1")
    @Column(nullable = false)
    private Integer globalAttribute1;
    @Column(nullable = false)
    @ColumnDefault("OAM")
    private String source;
    @Column(nullable = false)
    private String groupId;
    @Column(nullable = false)
    private LocalDateTime glDate;
    @Column(nullable = false)
    @ColumnDefault("4")
    private Integer orgId;
    @ManyToOne(targetEntity= AccountingSlipEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "account_slip_id")
    private AccountingSlipEntity accountSlipId;


}
