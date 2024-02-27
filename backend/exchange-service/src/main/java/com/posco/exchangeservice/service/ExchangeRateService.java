package com.posco.exchangeservice.service;

import com.posco.exchangeservice.dto.ExchangeRateDTO;

import java.util.List;

public interface ExchangeRateService {

    List<ExchangeRateDTO> getAllExchangeRates();

    List<ExchangeRateDTO> getExchangeRateByFromCurr(String fromCurr);

    List<ExchangeRateDTO> getExchangeRateByToCurr(String toCurr);

    List<ExchangeRateDTO> getExchangeRateByFromAndToCurr(String fromCurr, String toCurr);

}
