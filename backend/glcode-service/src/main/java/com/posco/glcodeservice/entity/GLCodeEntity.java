package com.posco.glcodeservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "pos_ovs_gl_code")
public class GLCodeEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long glCodeId;                                          // AUTO_INCREMENT ID

    @Column(name = "ovs_cd", insertable = false, updatable = false)
    private String ovsCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ovs_cd", referencedColumnName = "ovs_cd")
    private ReferenceEntity referenceEntity;

    @Column
    private String tranCd;                                          // 식별코드

    @Column
    private String accountName;                                     // 계정명

    @Column
    private Long account;                                           // 계정코드

    @Column
    private Long subAccount;                                        // 보조계정

    @Column
    private Long depositCd;                                         // 입출금구분

    @Column
    private String deptReqFlag;                                     // 부서코드 필수여부

    @Column
    private String majorCt;                                         // 대분류

    @Column
    private String mediumCt;                                        // 중분류

    @Column
    private String minorCt;                                         // 소분류

    @Column
    private String description;                                     // 적요설명

    @Column
    private String additionalComment;                               // 비고

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "ovs_cd", referencedColumnName = "ovs_cd")
//    private ReferenceEntity referenceEntity;

}
