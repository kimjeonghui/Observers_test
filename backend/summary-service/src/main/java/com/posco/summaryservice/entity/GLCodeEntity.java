package com.posco.summaryservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "pos_ovs_gl_code")
public class GLCodeEntity extends BaseEntity{
    @Id
    @Column
    private String tranCd;              // 식별 코드

    @Column(nullable = false)
    private String accountName;         // 계정명

    @Column
    private Long account;               // 계정 코드

    @Column
    private Long subAccount;            // 보조 계정

    @Column(nullable = false)
    private Long depositCd;             // 입출금 구분

    @Column(nullable = false)
    private String deptReqFlag;           // 부서 코드 필수 여부

    @Column
    private String description;         // 적요 설명

    @Column
    private String additionalComment;   // 비고

    @Column
    private String majorCt;             // 대분류

    @Column
    private String mediumCt;            // 중분류

    @Column
    private String minorCt;             // 소분류

    @Column(name = "ovs_cd", insertable = false, updatable = false)
    private String ovsCd;               // 사무소 코드

    @OneToMany(mappedBy = "glCodeEntity", cascade = CascadeType.REMOVE)
    private List<SummaryContentsEntity> summaryContentsEntities;

    @ManyToOne(targetEntity = ReferenceEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ovs_cd")
    private ReferenceEntity referenceEntity;
}
