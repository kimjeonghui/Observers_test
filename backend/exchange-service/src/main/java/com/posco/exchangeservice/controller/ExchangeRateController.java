package com.posco.exchangeservice.controller;

import com.posco.exchangeservice.dto.ExchangeRateDTO;
import com.posco.exchangeservice.entity.ExchangeRateEntity;
import com.posco.exchangeservice.service.ExchangeRateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("exchange-rate")
@Tag(name = "[EXCHANGE-RATE] Exchange API")
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping
    @Operation(summary = "Get all exchange rates", description = "Get a list of all exchange rates.")
    public ResponseEntity<?> getAllExchangeRates(){
        Map<String, Object> resultMap = new HashMap<>();
        List<ExchangeRateDTO> exchangeRateList = exchangeRateService.getAllExchangeRates();

        if (exchangeRateList.isEmpty()) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "No exchange rates found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "Exchange rates retrieved successfully.");
        resultMap.put("exchangeRateList", exchangeRateList);

        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/from/{fromCurr}")
    @Operation(summary = "Get all exchange rates", description = "Get a list of all exchange rates.")
    public ResponseEntity<?> getExchangeRateByFromCurr(@PathVariable String fromCurr){
        Map<String, Object> resultMap = new HashMap<>();
        List<ExchangeRateDTO> exchangeRates = exchangeRateService.getExchangeRateByFromCurr(fromCurr);

        if (exchangeRates.isEmpty()) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "No FROM exchange rates found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "FROM exchange rates retrieved successfully.");
        resultMap.put("FROM exchangeRates", exchangeRates);

        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/to/{toCurr}")
    @Operation(summary = "Get all exchange rates", description = "Get a list of all exchange rates.")
    public ResponseEntity<?> getExchangeRateByToCurr(@PathVariable String toCurr){
        Map<String, Object> resultMap = new HashMap<>();
        List<ExchangeRateDTO> exchangeRates = exchangeRateService.getExchangeRateByToCurr(toCurr);

        if (exchangeRates.isEmpty()) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "No TO exchange rates found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "TO exchange rates retrieved successfully.");
        resultMap.put("TO exchangeRates", exchangeRates);

        return ResponseEntity.ok().body(resultMap);
    }




}
