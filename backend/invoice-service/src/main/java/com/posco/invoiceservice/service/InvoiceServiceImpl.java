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
        String status = "draft";

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
}
