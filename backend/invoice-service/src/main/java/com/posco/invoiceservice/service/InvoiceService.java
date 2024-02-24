package com.posco.invoiceservice.service;


import com.posco.invoiceservice.dto.request.InvoiceDTO;
import com.posco.invoiceservice.dto.response.InvoiceResponseDTO;
import com.posco.invoiceservice.entity.InvoiceDataEntity;

import java.util.List;

public interface InvoiceService {
    InvoiceDataEntity createInvoice(InvoiceDTO invoiceDTO);

    List<InvoiceDataEntity> createInvoiceList(List<InvoiceDTO> invoiceDTOList);

    List<InvoiceResponseDTO> getInvoiceList(String ovsCd, String fiscalMonth);

    InvoiceResponseDTO getInvoice(Long invoiceId);

}
