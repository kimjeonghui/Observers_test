package com.posco.exchangeservice.repository;

import com.posco.exchangeservice.entity.ExchangeRateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeRateRepository extends JpaRepository<ExchangeRateEntity, String>, ExchangeRateRepositoryCustom {

    List<ExchangeRateEntity> findByFromCurr(String fromCurr);
    List<ExchangeRateEntity> findByToCurr(String toCurr);
    List<ExchangeRateEntity> findByFromCurrAndToCurr(String fromCurr, String toCurr);

}
