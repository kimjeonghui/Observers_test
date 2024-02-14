package com.posco.summaryservice.service;


import com.posco.summaryservice.dto.request.SummaryDTO;
import com.posco.summaryservice.entity.SummaryContentsEntity;
import com.posco.summaryservice.entity.SummaryEntity;

import java.time.LocalDateTime;

public interface SummaryService {
    SummaryEntity createSummary(SummaryDTO summaryDTO);
    SummaryContentsEntity createSummaryContent(SummaryEntity summaryEntity, SummaryDTO summaryDTO);
}
