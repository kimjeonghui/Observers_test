package com.posco.invoiceservice.controller;

import com.posco.invoiceservice.dto.request.InvoiceDTO;
import com.posco.invoiceservice.dto.request.InvoiceDataStatusDTO;
import com.posco.invoiceservice.dto.response.InvoiceResponseDTO;
import com.posco.invoiceservice.entity.InvoiceDataEntity;
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
    @PostMapping
//    @Operation(summary = "Insert summary", description = "")
    public ResponseEntity<?> createInvoice (@Valid @RequestBody InvoiceDTO invoiceDTO){
        Map<String, Object> resultMap = new HashMap<>();

        InvoiceDataEntity invoiceEntity = invoiceService.createInvoice(invoiceDTO);
        if(invoiceEntity==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "당월 거래 입력 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "당월 거래 입력 성공");
        return ResponseEntity.ok().body(resultMap);
    }

    @PostMapping("/list")
//    @Operation(summary = "Insert summary", description = "")
    public ResponseEntity<?> createInvoiceList (@Valid @RequestBody List<InvoiceDTO> invoiceDTOList){
        Map<String, Object> resultMap = new HashMap<>();
        System.out.println("들어온 데이터 "+ invoiceDTOList);

        List<InvoiceDataEntity>invoiceEntity = invoiceService.createInvoiceList(invoiceDTOList);
        if(invoiceEntity==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "당월 거래 입력 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "당월 거래 입력 성공");
        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/{ovsCd}/{fiscalMonth}")
    public ResponseEntity<?> getInvoiceList (@PathVariable String ovsCd, @PathVariable String fiscalMonth){//@RequestBody GetInvoiceListDTO getInvoiceListDTO){
        Map<String, Object> resultMap = new HashMap<>();
        List<InvoiceResponseDTO> responseDTOList = invoiceService.getInvoiceList(ovsCd,fiscalMonth);

        if(responseDTOList.isEmpty()){
            resultMap.put("result",FAIL);
            resultMap.put("msg","당월 거래가 없습니다.");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(resultMap);
        }
        resultMap.put("result",SUCCESS);
        resultMap.put("msg","당월 거래 리스트 호출을 성공했습니다.");
        resultMap.put("invoiceList", responseDTOList);
        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/{ovs-cd}/{fiscal-month}/{status}")
    public List<InvoiceResponseDTO> getInvoiceDataList(@PathVariable(name = "ovs-cd")String ovsCd,
                                                       @PathVariable(name = "fiscal-month")String fiscalMonth,
                                                       @PathVariable(name = "status")String status){
        return invoiceService.findInvoiceData(ovsCd, fiscalMonth, status);
    }
    @PatchMapping("/{ovs-cd}/{fiscal-month}")
    public List<InvoiceResponseDTO> patchInvoiceDateList(@PathVariable(name = "ovs-cd")String ovsCd,
                                                         @PathVariable(name = "fiscal-month")String fiscalMonth,
                                                         @RequestBody InvoiceDataStatusDTO statusDTO){
        return invoiceService.updateInvoiceData(ovsCd, fiscalMonth, statusDTO.getStatus());
    }

}
