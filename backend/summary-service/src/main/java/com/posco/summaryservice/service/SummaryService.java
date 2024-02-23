package com.posco.summaryservice.service;


import com.posco.summaryservice.dto.request.SummaryDTO;
import com.posco.summaryservice.dto.response.SummaryResponseDTO;
import com.posco.summaryservice.entity.SummaryContentsEntity;
import com.posco.summaryservice.entity.SummaryEntity;

import java.time.LocalDate;
import java.util.List;

public interface SummaryService {
    SummaryEntity createSummary(SummaryDTO summaryDTO);
    SummaryContentsEntity createSummaryContent(SummaryEntity summaryEntity, SummaryDTO summaryDTO);

    SummaryResponseDTO getSummaryContents(String ovsCd, String fiscalMonth);
}
