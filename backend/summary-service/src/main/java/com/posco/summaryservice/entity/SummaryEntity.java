package com.posco.summaryservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name="pos_ovs_period_summaries")
public class SummaryEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long summaryId;

    @Column(nullable = false)
    private String ovsCd;

//    @Column(nullable = false)
//    private String ovsName;

    @Column(nullable = false)
    private String fiscalMonth;

    @Column
    private String locCurr;         // 현지 통화

    @Column
    private String transCurr;       // 송금 통화

    @OneToMany(mappedBy = "summaryEntity", cascade = CascadeType.REMOVE)
    private List<SummaryContentsEntity> summaryContentsEntityList;
}

