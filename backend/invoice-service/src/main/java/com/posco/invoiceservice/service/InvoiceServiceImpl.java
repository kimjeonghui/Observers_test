package com.posco.invoiceservice.service;

import com.posco.invoiceservice.dto.request.InvoiceDTO;
import com.posco.invoiceservice.dto.response.EvidenceDTO;
import com.posco.invoiceservice.dto.response.InvoiceResponseDTO;
import com.posco.invoiceservice.entity.EvidenceDataEntity;
import com.posco.invoiceservice.entity.InvoiceDataEntity;
import com.posco.invoiceservice.repository.EvidenceRepository;
import com.posco.invoiceservice.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final EvidenceRepository evidenceRepository;

    // 당월거래입력
    @Override
    public InvoiceDataEntity createInvoice(InvoiceDTO invoiceDTO) {
        String status = "DRAFT";
        
        InvoiceDataEntity invoiceEntity = InvoiceDataEntity.builder()
                .ovsCd(invoiceDTO.getOvsCd())
                .fiscalMonth(invoiceDTO.getFiscalMonth())
                .txDate(invoiceDTO.getTxDate())
                .store(invoiceDTO.getStore())
                .depCurr(invoiceDTO.getDepCurr())
                .deposit(invoiceDTO.getDeposit())
                .wdCurr(invoiceDTO.getWdCurr())
                .withdrawal(invoiceDTO.getWithdrawal())
                .tranCd(invoiceDTO.getTranCd())
                .description(invoiceDTO.getDescription())
//                .transAmount() Todo:환율가져와서 계산해야함
                .status(status)
//                .exchangeRate() Todo:환율가져와
                .build();

        return invoiceRepository.save(invoiceEntity);
    }

    @Override
    public List<InvoiceDataEntity> createInvoiceList(List<InvoiceDTO> invoiceDTOList) {
        String status = "draft";
        List<InvoiceDataEntity> invoiceEntities = new ArrayList<>();

        for (InvoiceDTO invoiceDTO : invoiceDTOList) {
            log.info("data "+ invoiceDTO);
            InvoiceDataEntity invoiceEntity = InvoiceDataEntity.builder()
                    .ovsCd(invoiceDTO.getOvsCd())
                    .fiscalMonth(invoiceDTO.getFiscalMonth())
                    .txDate(invoiceDTO.getTxDate())
                    .store(invoiceDTO.getStore())
                    .depCurr(invoiceDTO.getDepCurr())
                    .deposit(invoiceDTO.getDeposit())
                    .wdCurr(invoiceDTO.getWdCurr())
                    .withdrawal(invoiceDTO.getWithdrawal())
                    .tranCd(invoiceDTO.getTranCd())
                    .description(invoiceDTO.getDescription())
                    // .transAmount() Todo: 환율 가져와서 계산해야함
                    .status(status)
                    // .exchangeRate() Todo: 환율 가져와서 설정
                    .build();

            invoiceEntities.add(invoiceEntity);
        }

        return invoiceRepository.saveAll(invoiceEntities);
    }


    @Override
    public List<InvoiceResponseDTO> getInvoiceList(String ovsCd, String fiscalMonth) {
        List<InvoiceDataEntity> invoiceEntities = invoiceRepository.findAllByOvsCdAndFiscalMonth(ovsCd,fiscalMonth);
        List<InvoiceResponseDTO> invoiceResponseDTOList = new ArrayList<>();

        for(InvoiceDataEntity invoiceEntity: invoiceEntities){
            // 증빙자료 리스트 만드는 for 문
            List<EvidenceDataEntity> evidenceEntities = evidenceRepository.findALLByInvoiceDataId(invoiceEntity.getInvoiceDataId());
            List<EvidenceDTO> evidenceDTOList = new ArrayList<>();
            for(EvidenceDataEntity evidenceEntity: evidenceEntities){
                EvidenceDTO evidenceDTO = EvidenceDTO.builder()
                        .evidenceId(evidenceEntity.getEvidenceId())
                        .evidenceDir(evidenceEntity.getEvidenceDir())
                        .invoiceDataId(evidenceEntity.getInvoiceDataId())
                        .build();
                evidenceDTOList.add(evidenceDTO);
            }

            InvoiceResponseDTO invoiceResponseDTO = InvoiceResponseDTO.builder()
                    .invoiceId(invoiceEntity.getInvoiceDataId())
                    .ovsCd(invoiceEntity.getOvsCd())
                    .fiscalMonth(invoiceEntity.getFiscalMonth())
                    .txDate(invoiceEntity.getTxDate())
                    .store(invoiceEntity.getStore())
                    .depCurr(invoiceEntity.getDepCurr())
                    .deposit(invoiceEntity.getDeposit())
                    .wdCurr(invoiceEntity.getWdCurr())
                    .withdrawal(invoiceEntity.getWithdrawal())
                    .tranCd(invoiceEntity.getTranCd())
                    .description(invoiceEntity.getDescription())
                    .transAmount(invoiceEntity.getTransAmount())
                    .status(invoiceEntity.getStatus())
                    .ocrId(invoiceEntity.getOcrId())
                    .evidenceDirs(evidenceDTOList)
                    .build();
            invoiceResponseDTOList.add(invoiceResponseDTO);
        }
        return invoiceResponseDTOList;
    }

    @Override
    public InvoiceResponseDTO getInvoice(Long invoiceId) {
        List<EvidenceDataEntity> evidenceEntities = evidenceRepository.findALLByInvoiceDataId(invoiceId);
        return null;
    }

    //사무소코드, 회계월, 거래내역 상태에 따른 거래내역 get
    private List<InvoiceDataEntity> getInvoicedataList(String ovsCd, String fiscalMonth, String status){
        return invoiceRepository.findAllByOvsCdAndFiscalMonthAndStatus(ovsCd,fiscalMonth, status);
    }

    //거래 내역 상태 바꿔주기
    //결재 승인 페이지, 회계전표(거래 내역 재작성), 회계전표(AP 전송)
    public List<InvoiceResponseDTO> updateInvoiceData(String ovsCd, String fiscalMonth, String status){
        List<InvoiceDataEntity> invoiceDataEntityList = getInvoicedataList(ovsCd, fiscalMonth);
        for(int i=0; i<invoiceDataEntityList.size(); i++){
            InvoiceDataEntity invoiceData = invoiceDataEntityList.get(i);
            invoiceData.setStatus(status);
            invoiceRepository.save(invoiceData);
        }
        return invoiceDataEntityList.stream().map(i -> InvoiceResponseDTO.toDTO(i)).collect(Collectors.toList());
    }

    //거래 내역을 상태에 따라서 가져오기
    //결재 승인 페이지
    public List<InvoiceResponseDTO> findInvoiceData(String ovsCd, String fiscalMonth, String status){
        List<InvoiceDataEntity> invoiceDataEntityList =getInvoicedataList(ovsCd, fiscalMonth, status);
        return invoiceDataEntityList.stream().map(i -> InvoiceResponseDTO.toDTO(i)).collect(Collectors.toList());
    }

    private List<InvoiceDataEntity> getInvoicedataList(String ovsCd, String fiscalMonth){
        return invoiceRepository.findAllByOvsCdAndFiscalMonth(ovsCd,fiscalMonth);
    }

}
