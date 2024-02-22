package com.posco.invoiceservice.service;

import com.posco.invoiceservice.dto.request.InvoiceDTO;
import com.posco.invoiceservice.dto.response.InvoiceResponseDTO;
import com.posco.invoiceservice.entity.InvoiceDataEntity;
import com.posco.invoiceservice.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;

    // 당월거래입력
    @Override
    public InvoiceDataEntity createInvoice(InvoiceDTO invoiceDTO) {
        LocalDateTime fiscalMonth = invoiceDTO.getFiscalMonth();
        LocalDateTime newTime = LocalDateTime.of(fiscalMonth.getYear(), fiscalMonth.getMonth(), 1, 0, 0, 0);
        InvoiceDataEntity invoiceEntity = invoiceRepository.findByFiscalMonth(newTime);
        InvoiceDataEntity saveInvoiceEntity = null;
        if(invoiceEntity==null){
            invoiceEntity = InvoiceDataEntity.builder()
                    .ovsCd(invoiceDTO.getOvsCd())
                    .fiscalMonth(newTime)
                    .build();
            saveInvoiceEntity = invoiceRepository.save(invoiceEntity);
        }else{
            saveInvoiceEntity = invoiceEntity;
        }
        return saveInvoiceEntity;
    }


    @Override
    public List<InvoiceResponseDTO> getInvoiceList(String ovsCd) {
        List<InvoiceDataEntity> invoiceEntities = InvoiceRepository.findAllByOvsCd(ovsCd);
        List<InvoiceResponseDTO> invoiceResponseDTOList = new ArrayList<>();
        //Todo: 여기에 invoiceList 사무소 코드로 불러오는거 넣기
        return invoiceResponseDTOList;
    }

    @Override
    public InvoiceResponseDTO getInvoice(String ovsCd) {
        return null;
    }
}
