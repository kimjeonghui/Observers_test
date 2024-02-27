package com.posco.referenceservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "pos_ovs_period_status")
public class PeriodStatusEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long periodStatusId;

    @Column(nullable = false)
    private String periodName;

    @Column(nullable = false)
    private String status;              //회계 기간 상태

    @Column
    private BigDecimal endingBalanceLoc1;    //기말잔액(현지화1)

    @Column
    private BigDecimal endingBalanceRc1;     //기말잔액(장부통화:현지화1)

    @Column
    private BigDecimal endingBalanceLoc2;    //기말잔액(현지화2)

    @Column
    private BigDecimal endingBalanceRc2;     //기말잔액(장부통화:현지화2)

    @Column(name = "ovs_cd", insertable = false, updatable = false)
    private String ovsCd;               // 사무소 코드

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ovs_cd", referencedColumnName = "ovs_cd")
    private ReferenceEntity referenceEntity;


}
