package com.posco.exchangeservice.service;

import com.posco.exchangeservice.dto.ExchangeRateDTO;
import com.posco.exchangeservice.entity.ExchangeRateEntity;
import com.posco.exchangeservice.repository.ExchangeRateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExchangeRateServiceImpl implements ExchangeRateService{

    private final ExchangeRateRepository exchangeRateRepository;

    public ExchangeRateServiceImpl(ExchangeRateRepository exchangeRateRepository) {
        this.exchangeRateRepository = exchangeRateRepository;
    }


    @Override
    public List<ExchangeRateDTO> getAllExchangeRates() {
        List<ExchangeRateEntity> exchangeRateEntities = exchangeRateRepository.findAll();
        return exchangeRateEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExchangeRateDTO> getExchangeRateByFromCurr(String fromCurr) {
        List<ExchangeRateEntity> exchangeRateEntities = exchangeRateRepository.findByFromCurr(fromCurr);
        return exchangeRateEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExchangeRateDTO> getExchangeRateByToCurr(String toCurr) {
        List<ExchangeRateEntity> exchangeRateEntities = exchangeRateRepository.findByToCurr(toCurr);
        return exchangeRateEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExchangeRateDTO> getExchangeRateByFromAndToCurr(String fromCurr, String toCurr) {
        List<ExchangeRateEntity> exchangeRateEntities = exchangeRateRepository.findByFromCurrAndToCurr(fromCurr, toCurr);
        return exchangeRateEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    private ExchangeRateDTO convertToDTO(ExchangeRateEntity exchangeRateEntity) {
        return ExchangeRateDTO.builder()
                .exchangeId(exchangeRateEntity.getExchangeId())
                .fromCurr(exchangeRateEntity.getFromCurr())
                .toCurr(exchangeRateEntity.getToCurr())
                .rateDate(exchangeRateEntity.getRateDate())
                .exchangeRate(exchangeRateEntity.getExchangeRate())
                .rateType(exchangeRateEntity.getRateType())
                .build();
    }

    private ExchangeRateEntity convertToEntity(ExchangeRateDTO exchangeRateDTO) {
        return ExchangeRateEntity.builder()
                .build();
    }
}
