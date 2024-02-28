package com.posco.summaryservice.service;

import com.posco.summaryservice.dto.request.SummaryDTO;
import com.posco.summaryservice.dto.response.SummaryContentDTO;
import com.posco.summaryservice.dto.response.SummaryResponseDTO;
import com.posco.summaryservice.entity.GLCodeEntity;
import com.posco.summaryservice.entity.ReferenceEntity;
import com.posco.summaryservice.entity.SummaryContentsEntity;
import com.posco.summaryservice.entity.SummaryEntity;
import com.posco.summaryservice.repository.GLCodeRepository;
import com.posco.summaryservice.repository.ReferenceRepository;
import com.posco.summaryservice.repository.SummaryContentsRepository;
import com.posco.summaryservice.repository.SummaryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
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
    private final ReferenceRepository referenceRepository;
    // 월 총괄표 생성
    @Override
    public SummaryEntity createSummary(SummaryDTO summaryDTO) {
        String fiscalMonth = summaryDTO.getFiscalMonth();
//        LocalDateTime newTime = LocalDateTime.of(fiscalMonth.getYear(), fiscalMonth.getMonth(), 1, 0, 0, 0);
        SummaryEntity summaryEntity = summaryRepository.findByFiscalMonth(fiscalMonth);
        ReferenceEntity referenceEntity = referenceRepository.findByOvsCd(summaryDTO.getOvsCd());
        SummaryEntity saveSummaryEntity = null;
        if(summaryEntity==null){
            summaryEntity = SummaryEntity.builder()
                    .ovsCd(summaryDTO.getOvsCd())
//                    .ovsName(summaryDTO.getOvsName())
                    .fiscalMonth(fiscalMonth)
                    .locCurr(referenceEntity.getLocCurr())
                    .transCurr(referenceEntity.getTransCurr())
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
            ReferenceEntity referenceEntity = referenceRepository.findByOvsCd(glCodeEntity.getOvsCd());
            BigDecimal loc = summaryDTO.getWdCurr().equals(summaryEntity.getLocCurr())?summaryDTO.getWithdrawal():summaryDTO.getDeposit();
            BigDecimal trans = summaryDTO.getWdCurr().equals(summaryEntity.getLocCurr())?summaryDTO.getWithdrawal():summaryDTO.getDeposit();
            newSummaryContents = SummaryContentsEntity.builder()
                    .majorCt(glCodeEntity.getMajorCt())
                    .mediumCt(glCodeEntity.getMediumCt())
                    .minorCt(glCodeEntity.getMinorCt())
                    .loc(loc)
                    .trans(trans)
                    .summaryId(summaryEntity.getSummaryId())
                    .summaryEntity(summaryEntity)
                    .tranCd(glCodeEntity.getTranCd())
                    .glCodeEntity(glCodeEntity)
                    .build();
        }else{
            BigDecimal loc = summaryDTO.getWdCurr().equals(summaryEntity.getLocCurr())?summaryDTO.getWithdrawal():summaryDTO.getDeposit();
            BigDecimal trans = summaryDTO.getWdCurr().equals(summaryEntity.getTransCurr())?summaryDTO.getWithdrawal():summaryDTO.getDeposit();

            newSummaryContents = SummaryContentsEntity.builder()
                    .summaryContentId(summaryContentsEntity.getSummaryContentId())
                    .majorCt(summaryContentsEntity.getMajorCt())
                    .mediumCt(summaryContentsEntity.getMediumCt())
                    .minorCt(summaryContentsEntity.getMinorCt())
                    .note(summaryContentsEntity.getNote())
                    .trans(trans!=null?trans.add(summaryContentsEntity.getTrans()):summaryContentsEntity.getTrans())
                    .loc(loc!=null?loc.add(summaryContentsEntity.getLoc()):summaryContentsEntity.getLoc())
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
    public SummaryResponseDTO getSummaryContents(String ovsCd, String fiscalMonth) {
        SummaryEntity summaryEntity = summaryRepository.findByOvsCdAndFiscalMonth(ovsCd, fiscalMonth);
        if(summaryEntity==null){
            return null;
        }
        List<SummaryContentsEntity> contentsEntities = summaryContentsRepository.findAllBySummaryId(summaryEntity.getSummaryId());
        List<SummaryContentDTO> summaryContentDTOList = new ArrayList<>();
        for(SummaryContentsEntity summaryContentsEntity: contentsEntities){
            SummaryContentDTO responseDTO = SummaryContentDTO.builder()
                    .summaryContentId(summaryContentsEntity.getSummaryContentId())
                    .majorCt(summaryContentsEntity.getMajorCt())
                    .mediumCt(summaryContentsEntity.getMediumCt())
                    .minorCt(summaryContentsEntity.getMinorCt())
                    .loc(summaryContentsEntity.getLoc())
                    .trans(summaryContentsEntity.getTrans())
                    .note(summaryContentsEntity.getNote())
                    .tranCd(summaryContentsEntity.getTranCd())
                    .build();
            summaryContentDTOList.add(responseDTO);
        }
        return SummaryResponseDTO.builder()
                .ovsCd(summaryEntity.getOvsCd())
//                .ovsName(summaryEntity.getOvsName())
                .fiscalMonth(summaryEntity.getFiscalMonth())
                .locCurr(summaryEntity.getLocCurr())
                .transCurr(summaryEntity.getTransCurr())
                .contents(summaryContentDTOList)
                .build();
    }
}
