package com.posco.summaryservice.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

public class PeriodStatusEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long periodStatusId;

    @Column(name = "ovs_cd", insertable = false, updatable = false)
    private String ovsCd;

    @Column
    private String periodName;

    @Column
    private String status;

    @Column
    private BigDecimal endingBalanceLoc1;

    @Column
    private BigDecimal endingBalanceRc1;

    @Column
    private BigDecimal endingBalanceLoc2;

    @Column
    private BigDecimal endingBalanceRc2;

}
