package com.posco.invoiceservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "pos_ovs_cost_center")
public class ReferenceEntity extends BaseEntity {

    @Id
    @Column(name = "ovs_cd", nullable = false)
    private String ovsCd;           // 사무소 코드

    @Column(nullable = false)
    private String ovsMeaning;      // 사무소 코드 의미

    @Column(nullable = false)
    private String ovsCopCd;        // 법인 코드

    @Column(nullable = false)
    private String glCurr;          // 장부 통화

    @Column(nullable = false)
    private String locCurr;         // 현지 통화1

    @Column
    private String locCurr2;        // 현지 통화2

    @Column(nullable = false)
    private String transCurr;       // 송금 통화1

    @Column
    private String transCurr2;      // 송금 통화2

    @Column(nullable = false)
    private LocalDate startDate;    // 시작일

    @Column
    private LocalDate endDate;      // 만료일

    @OneToMany(mappedBy = "referenceEntity", cascade = CascadeType.REMOVE)
    private List<GLCodeEntity> codeEntityList;

}
