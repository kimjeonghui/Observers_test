package com.posco.summaryservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class SummaryResponseDTO {
    private String ovsCd;
    private String ovsName;
    private String fiscalMonth;
    private String locCurr;
    private String transCurr;
    private List<SummaryContentDTO> contents;
}
