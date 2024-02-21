package com.posco.invoiceservice.service;


import com.posco.invoiceservice.dto.request.SummaryDTO;
import com.posco.invoiceservice.dto.response.SummaryResponseDTO;
import com.posco.invoiceservice.entity.SummaryContentsEntity;
import com.posco.invoiceservice.entity.SummaryEntity;

import java.util.List;

public interface SummaryService {
    SummaryEntity createSummary(SummaryDTO summaryDTO);
    SummaryContentsEntity createSummaryContent(SummaryEntity summaryEntity, SummaryDTO summaryDTO);

    List<SummaryResponseDTO> getSummaryContents(String ovsCd);
}
