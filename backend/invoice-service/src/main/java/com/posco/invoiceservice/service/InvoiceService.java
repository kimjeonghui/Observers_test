package com.posco.invoiceservice.service;


import com.posco.invoiceservice.dto.request.InvoiceDTO;
import com.posco.invoiceservice.dto.response.InvoiceResponseDTO;
import com.posco.invoiceservice.entity.InvoiceDataEntity;

import java.util.List;

public interface InvoiceService {
    InvoiceDataEntity createInvoice(InvoiceDTO invoiceDTO);

    InvoiceResponseDTO getInvoice(String ovsCd);

    List<InvoiceResponseDTO> getInvoiceList(String ovsCd);



}
