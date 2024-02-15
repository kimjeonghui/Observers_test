package com.posco.summaryservice.service;

import com.posco.summaryservice.dto.request.SummaryDTO;
import com.posco.summaryservice.dto.response.SummaryResponseDTO;
import com.posco.summaryservice.entity.GLCodeEntity;
import com.posco.summaryservice.entity.SummaryContentsEntity;
import com.posco.summaryservice.entity.SummaryEntity;
import com.posco.summaryservice.repository.GLCodeRepository;
import com.posco.summaryservice.repository.SummaryContentsRepository;
import com.posco.summaryservice.repository.SummaryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class SummaryServiceImpl implements SummaryService {
    private final SummaryRepository summaryRepository;
    private final SummaryContentsRepository summaryContentsRepository;
    private final GLCodeRepository glCodeRepository;
    // 월 총괄표 생성
    @Override
    public SummaryEntity createSummary(SummaryDTO summaryDTO) {
        LocalDateTime fiscalMonth = summaryDTO.getFiscalMonth();
        LocalDateTime newTime = LocalDateTime.of(fiscalMonth.getYear(), fiscalMonth.getMonth(), 1, 0, 0, 0);
        SummaryEntity summaryEntity = summaryRepository.findByFiscalMonth(newTime);
        SummaryEntity saveSummaryEntity = null;
        if(summaryEntity==null){
            summaryEntity = SummaryEntity.builder()
                    .ovsCd(summaryDTO.getOvsCd())
                    .ovsName(summaryDTO.getOvsName())
                    .fiscalMonth(newTime)
                    .build();
            saveSummaryEntity = summaryRepository.save(summaryEntity);
        }else{
            saveSummaryEntity = summaryEntity;
        }

        log.info("summaryId"+summaryEntity.getSummaryId());
        return saveSummaryEntity;
    }

    // 월 총괄표 내용 생성
    @Override
    public SummaryContentsEntity createSummaryContent(SummaryEntity summaryEntity, SummaryDTO summaryDTO) {
        SummaryContentsEntity summaryContentsEntity = summaryContentsRepository.findByTranCd(summaryDTO.getTranCd());
        SummaryContentsEntity newSummaryContents = null;
        log.info("tranCd"+summaryDTO.getTranCd());
        // 해당 식별코드 거래 정보가 없는 경우
        if(summaryContentsEntity==null){
            // 식별코드 정보 가져오기
            GLCodeEntity glCodeEntity = glCodeRepository.findById(summaryDTO.getTranCd()).orElseThrow();
            newSummaryContents = SummaryContentsEntity.builder()
                    .majorCt(glCodeEntity.getMajorCt())
                    .mediumCt(glCodeEntity.getMediumCt())
                    .minorCt(glCodeEntity.getMinorCt())
                    .locCurr(summaryDTO.getDepCurr())
                    .loc(summaryDTO.getDeposit())
                    .transCurr(summaryDTO.getWdCurr())
                    .trans(summaryDTO.getWithdrawal())
                    .summaryId(summaryEntity.getSummaryId())
                    .summaryEntity(summaryEntity)
                    .tranCd(glCodeEntity.getTranCd())
                    .glCodeEntity(glCodeEntity)
                    .build();
        }else{
            BigDecimal loc = summaryDTO.getDepCurr().equals(summaryContentsEntity.getLocCurr())?summaryDTO.getWithdrawal():summaryDTO.getDeposit();
            BigDecimal trans = summaryDTO.getDepCurr().equals(summaryContentsEntity.getLocCurr())?summaryDTO.getWithdrawal():summaryDTO.getDeposit();

            newSummaryContents = SummaryContentsEntity.builder()
                    .summaryContentId(summaryContentsEntity.getSummaryContentId())
                    .majorCt(summaryContentsEntity.getMajorCt())
                    .mediumCt(summaryContentsEntity.getMediumCt())
                    .minorCt(summaryContentsEntity.getMinorCt())
                    .note(summaryContentsEntity.getNote())
                    .trans(trans)
                    .loc(loc)
                    .summaryId(summaryContentsEntity.getSummaryId())
                    .summaryEntity(summaryContentsEntity.getSummaryEntity())
                    .tranCd(summaryContentsEntity.getTranCd())
                    .glCodeEntity(summaryContentsEntity.getGlCodeEntity())
                    .build();
        }
        summaryContentsRepository.save(newSummaryContents);
        return newSummaryContents;
    }

    @Override
    public List<SummaryResponseDTO> getSummaryContents(String ovsCd) {
        List<SummaryEntity> summaryEntities = summaryRepository.findAllByOvsCd(ovsCd);
        List<SummaryResponseDTO> summaryResponseDTOS = new ArrayList<>();
        for(SummaryEntity summaryEntity : summaryEntities){
            List<SummaryContentsEntity> contentsEntities = summaryContentsRepository.findAllBySummaryId(summaryEntity.getSummaryId());
            for(SummaryContentsEntity summaryContentsEntity: contentsEntities){
                SummaryResponseDTO responseDTO = SummaryResponseDTO.builder()
                        .ovsCd(summaryEntity.getOvsCd())
                        .ovsName(summaryEntity.getOvsName())
                        .fiscalMonth(summaryEntity.getFiscalMonth())
                        .majorCt(summaryContentsEntity.getMajorCt())
                        .mediumCt(summaryContentsEntity.getMediumCt())
                        .minorCt(summaryContentsEntity.getMinorCt())
                        .locCurr(summaryContentsEntity.getLocCurr())
                        .loc(summaryContentsEntity.getLoc())
                        .transCurr(summaryContentsEntity.getTransCurr())
                        .trans(summaryContentsEntity.getTrans())
                        .note(summaryContentsEntity.getNote())
                        .build();
                summaryResponseDTOS.add(responseDTO);
            }
        }
        return summaryResponseDTOS;
    }
}
