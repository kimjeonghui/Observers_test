package com.posco.summaryservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.swagger.v3.oas.annotations.callbacks.Callback;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ovs_period_summary_contents")
public class SummaryContentsEntity extends BaseEntity{
    @Id
    @Column(name = "summary_content_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long summaryContentId;  // 식별자

    @Column
    private String majorCt;         // 대분류

    @Column
    private String mediumCt;        // 중분류

    @Column
    private String minorCt;         // 소분류

    @Column
    private BigDecimal loc;         // 현지 통화 금액

    @Column
    private BigDecimal trans;       // 송금 통화 금액

    @Column
    private String note;            // 비고

    @Column(name = "summary_id", insertable = false, updatable = false)
    private Long summaryId;         // 총괄표 id

    @Column(name = "tran_cd", insertable = false, updatable = false)
    private String tranCd;          // 식별 코드

    @ManyToOne(targetEntity = SummaryEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "summary_id")
    @JsonBackReference
    private SummaryEntity summaryEntity;

    @ManyToOne(targetEntity = GLCodeEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "tran_cd")
    @JsonBackReference
    private GLCodeEntity glCodeEntity;
}
