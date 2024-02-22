package com.posco.invoiceservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

    @Column(nullable = false)
    private String ovsName;

    @Column(nullable = false)
    private LocalDateTime fiscalMonth;

    @OneToMany(mappedBy = "summaryEntity", cascade = CascadeType.REMOVE)
    private List<SummaryContentsEntity> summaryContentsEntityList;
}

