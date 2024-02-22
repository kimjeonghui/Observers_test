package com.posco.exchangeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ExchangeRateDTO {

    private Long exchangeId;
    private String fromCurr;
    private String toCurr;
    private LocalDate rateDate;
    private Float exchangeRate;
    private String rateType;
}
