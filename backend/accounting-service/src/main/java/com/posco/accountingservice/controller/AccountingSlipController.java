package com.posco.accountingservice.controller;

import com.posco.accountingservice.dto.request.InvoiceDataStatusDTO;
import com.posco.accountingservice.dto.response.AccountingSlipDTO;
import com.posco.accountingservice.dto.response.InvoiceResponseDTO;
import com.posco.accountingservice.entity.AccountingSlipEntity;
import com.posco.accountingservice.service.AccountingSlipService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/accountingSlips")
@Slf4j
public class AccountingSlipController {
    private final AccountingSlipService accountingSlipService;
    @PostMapping("/{ovs-cd}/{fiscal-month}")
    public List<AccountingSlipDTO> createAccountingSlip(@PathVariable(name = "ovs-cd")String ovsCd,
                                                     @PathVariable(name = "fiscal-month") String fiscalMonth){
        System.out.println(ovsCd);
        System.out.println(fiscalMonth);
        List<AccountingSlipEntity> accountingSlip = accountingSlipService.createAccountingSlip(ovsCd, fiscalMonth);
        return accountingSlip.stream().map( i-> AccountingSlipDTO.toDto(i, i.getAccountingSlipInvoiceNumEntity().getInvoiceDataEntity()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{ovs-cd}/{fiscal-month}")
    public List<AccountingSlipDTO> getAccountingSlip(@PathVariable(name = "ovs-cd")String ovsCd,
                                                      @PathVariable(name = "fiscal-month")String fiscalMonth){
        return accountingSlipService.findAccoutingSlipList(ovsCd, fiscalMonth);
    }

    @GetMapping("/{ovs-cd}/{fiscal-month}/{status}")
    public List<InvoiceResponseDTO> getInvoiceDataList(@PathVariable(name = "ovs-cd")String ovsCd,
                                                       @PathVariable(name = "fiscal-month")String fiscalMonth,
                                                       @PathVariable(name = "status")String status){
        return accountingSlipService.findInvoiceData(ovsCd, fiscalMonth, status);
    }
    @PatchMapping("/{ovs-cd}/{fiscal-month}")
    public List<InvoiceResponseDTO> patchInvoiceDateList(@PathVariable(name = "ovs-cd")String ovsCd,
                                                         @PathVariable(name = "fiscal-month")String fiscalMonth,
                                                         @RequestBody InvoiceDataStatusDTO statusDTO){
        return accountingSlipService.updateInvoiceData(ovsCd, fiscalMonth, statusDTO.getStatus());
    }

}
