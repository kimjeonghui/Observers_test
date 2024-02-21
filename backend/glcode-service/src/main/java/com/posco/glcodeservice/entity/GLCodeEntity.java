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
public class GLCodeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long glCodeId;                             // AUTO_INCREMENT ID

    @Column
    private String tranCd;

    @Column
    private String accountName;

    @Column
    private Long account;

    @Column
    private Long subAccount;

    @Column
    private Long depositCd;

    @Column
    private String deptReqFlag;

    @Column
    private String majorCt;

    @Column
    private String mediumCt;

    @Column
    private String minorCt;

    @Column(name = "ovs_cd", insertable = false, updatable = false)
    private String ovsCd;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "ovs_cd", referencedColumnName = "ovs_cd")
//    private ReferenceEntity referenceEntity;





}
