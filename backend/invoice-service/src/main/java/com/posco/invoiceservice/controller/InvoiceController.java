package com.posco.invoiceservice.controller;

import com.posco.invoiceservice.dto.request.GetInvoiceListDTO;
import com.posco.invoiceservice.dto.request.InvoiceDTO;
import com.posco.invoiceservice.dto.response.InvoiceResponseDTO;
import com.posco.invoiceservice.service.InvoiceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/invoice")
@Tag(name = "[INVOICE] Invoice API")
@Slf4j
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
//    @PostMapping
//    @Operation(summary = "Insert summary", description = "")
//    public ResponseEntity<?> createSummary (@RequestBody SummaryDTO summaryDTO){
//        Map<String, Object> resultMap = new HashMap<>();
//        // summary가 있는지 확인하고 없으면 summary 생성
//        SummaryEntity summaryEntity = summaryService.createSummary(summaryDTO);
//        if(summaryEntity==null){
//            resultMap.put("result", FAIL);
//            resultMap.put("msg", "월 총괄표 생성 실패");
//            return ResponseEntity.badRequest().body(resultMap);
//        }
//        // 해당 식별코드의 summary content 추가
//        SummaryContentsEntity summaryContentsEntity = summaryService.createSummaryContent(summaryEntity, summaryDTO);
//        if(summaryContentsEntity==null){
//            resultMap.put("result", FAIL);
//            resultMap.put("msg", "월 총괄표 내용 입력 실패");
//            return ResponseEntity.badRequest().body(resultMap);
//        }
//        resultMap.put("result", SUCCESS);
//        resultMap.put("msg", "월 총괄표 입력 성공");
//        return ResponseEntity.ok().body(resultMap);
//    }
//
    @GetMapping
    public ResponseEntity<?> getInvoiceList (@Valid @RequestBody GetInvoiceListDTO getInvoiceListDTO){
        Map<String, Object> resultMap = new HashMap<>();
        List<InvoiceResponseDTO> responseDTOList = invoiceService.getInvoiceList(getInvoiceListDTO.getOvsCd(),getInvoiceListDTO.getFiscalMonth());

        if(responseDTOList.isEmpty()){
            resultMap.put("result",FAIL);
            resultMap.put("msg","당월 거래가 없습니다.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }
        resultMap.put("result",SUCCESS);
        resultMap.put("msg","당월 거래 리스트 호출을 성공했습니다.");
        resultMap.put("invoiceList", responseDTOList);
        return ResponseEntity.ok().body(resultMap);
    }
}
