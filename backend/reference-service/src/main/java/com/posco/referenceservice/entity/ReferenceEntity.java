package com.posco.referenceservice.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "pos_ovs_cost_center")
public class ReferenceEntity extends BaseEntity {

    @Id
    @Column(name = "OVS_CD", nullable = false)
    private String ovsCd; // 사무소 코드

    @Column(name = "OVS_MEANING", nullable = false)
    private String ovsMeaning; // 사무소 코드 의미

    @Column(name = "OVS_COP_CD", nullable = false)
    private String ovsCopCd; // 법인 코드

    @Column(name = "GL_CURR", nullable = false)
    private String glCurr; // 장부 통화

    @Column(name = "LOC_CURR", nullable = false)
    private String locCurr; // 현지 통화1

    @Column(name = "LOC_CURR2")
    private String locCurr2; // 현지 통화2

    @Column(name = "TRANS_CURR", nullable = false)
    private String transCurr; // 송금 통화1

    @Column(name = "TRANS_CURR2")
    private String transCurr2; // 송금 통화2

    @Column(name = "START_DATE", nullable = false)
    private LocalDate startDate; // 시작일

    @Column(name = "END_DATE")
    private LocalDate endDate; // 만료일


    //Extends 사용 = 불필요
    /*@Column(name = "CREATED_BY", nullable = false)
    private String createdBy; // 생성자

    @Column(name = "CREATED_DATE", nullable = false)
    @CreatedDate
    private Date createdDate; // 생성일

    @Column(name = "LAST_UPDATED_BY", nullable = false)
    private String lastUpdatedBy; // 최종 수정자

    @Column(name = "LAST_UPDATED_DATE", nullable = false)
    private Date lastUpdatedDate; // 최종 수정일*/

}
