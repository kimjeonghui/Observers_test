package com.posco.ocrservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ocr")
public class OcrEntity extends BaseEntity {
    @Id
    @Column(name = "ocr_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ocrId;             // 식별자

    @Column(nullable = false)
    private String receiptDir;      // 영수증 경로

    @Column(nullable = false)
    private String coCd;            // 회사 코드

    @Column(nullable = false)
    private String ovsCd;           // 부서 코드

    @Column(nullable = false)
    private LocalDateTime purDate;  // 거래 날짜

    @Column(nullable = false)
    private String store;           // 거래처 명

    @Column(nullable = false)
    private String description;     // 거래 내용

    @Column(nullable = false)
    private Long invoiceDataId;     // 거래 자료 아이디

    @Column(nullable = false)
    private String currCode;        // 통화 코드

    @Column(nullable = false)
    private BigDecimal totalVal;    // 총 금액
}
