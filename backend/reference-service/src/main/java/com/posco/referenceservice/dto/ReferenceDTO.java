package com.posco.referenceservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ReferenceDTO {

    private String ovsCd;       // 사무소 코드
    private String ovsMeaning;  // 사무소 코드 의미
    private String ovsCopCd;    // 법인 코드
    private String glCurr;      // 장부 통화
    private String locCurr;     // 현지 통화1
    private String locCurr2;    // 현지 통화2
    private String transCurr;   // 송금 통화1
    private String transCurr2;  // 송금 통화2
    private LocalDate startDate;// 시작일
    private LocalDate endDate;  // 만료일
}
