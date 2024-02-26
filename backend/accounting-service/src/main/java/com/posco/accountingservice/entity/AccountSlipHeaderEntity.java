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
public class AccountSlipHeaderEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceHeaderId; // 헤더발번
    @Column(nullable = false)
    private String invoiceNum; //송장번호
    @Column(nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'STANDARD'")
    //@ColumnDefault("STANDARD")
    private String invoiceTypeLookupCode; //송장 타입 조회 코드
    @Column(nullable = false)
    private LocalDate txDate; //거래일자
    @Column(nullable = false, columnDefinition = "INT DEFAULT 3049")
    //@ColumnDefault("3049")
    private Integer vendorId; //공급업체 아이디
    @Column(nullable = false, columnDefinition = "VARCHAR(25) DEFAULT '해외사무소'")
    //@ColumnDefault("해외사무소")
    private String vendorName; //공급업체 이름
    @Column(nullable = false)
    private String vendorSiteCode; //지불 통화 코드
    @Column(nullable = false)
    private String invoiceCurrencyCode; //송장통화코드
    @Column(nullable = false)
    private String paymentCurrencyCode; //지불 통화 코드
    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    //@ColumnDefault("0")
    private Integer invoiceAmount; //금액
    @Column(nullable = false)
    private Float exchangeRate;//환율
    @Column(nullable = false, columnDefinition = "INT DEFAULT 1002")
    //@ColumnDefault("1002")
    private Integer exchangeRateType; //환율 타입
    @Column(nullable = false)
    private LocalDate exchangeDate; //환율 일자
    @Column(nullable = false)
    private String description; //적요
    @Column(nullable = false, columnDefinition = "VARCHAR(45) DEFAULT 'JA.KR.APXINWKB.INVOICES'")
    //@ColumnDefault("JA.KR.APXINWKB.INVOICES")
    private String globalAttributeCategory;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 1")
    private String globalAttribute1; //송장번호와 똑같음
    @Column(nullable = false, columnDefinition = "VARCHAR(45) DEFAULT 'OAM'")
    //@ColumnDefault("OAM")
    private String source;
    @Column(nullable = false)
    private String groupId;
    @Column(nullable = false)
    private LocalDateTime glDate;
    @Column(nullable = false, columnDefinition = "INT DEFAULT 4")
    //@ColumnDefault("4")
    private Integer orgId;
    @OneToOne(targetEntity= AccountingSlipEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "account_slip_id")
    private AccountingSlipEntity accountingSlip;


}
