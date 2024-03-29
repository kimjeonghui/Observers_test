package com.posco.accountingservice.service;

import com.posco.accountingservice.dto.response.AccountingSlipDTO;
import com.posco.accountingservice.dto.response.InvoiceResponseDTO;
import com.posco.accountingservice.entity.AccountingSlipEntity;
import com.posco.accountingservice.entity.AccountingSlipInvoiceNumEntity;
import com.posco.accountingservice.entity.GLcodeEnum;
import com.posco.accountingservice.entity.InvoiceDataEntity;
import com.posco.accountingservice.repository.AccountingSlipInvoiceNumRepository;
import com.posco.accountingservice.repository.AccountingSlipRepository;
import com.posco.accountingservice.repository.InvoiceDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountingSlipService {
    private final InvoiceDataRepository invoiceDataRepository;
    private final AccountingSlipInvoiceNumRepository invoiceNumRepository;
    private final AccountingSlipRepository accountingSlipRepository;
    @PersistenceContext
    private EntityManager entityManager;

    //사무소코드, 회계월, 거래내역 상태에 따른 거래내역 get
    private List<InvoiceDataEntity> getInvoicedataList(String ovsCd, String fiscalMonth, String status){
        System.out.println(invoiceDataRepository.findAllByOvsCdAndFiscalMonthAndStatus(ovsCd,fiscalMonth, status));
        return invoiceDataRepository.findAllByOvsCdAndFiscalMonthAndStatus(ovsCd,fiscalMonth, status);
    }

    ////사무소코드, 회계월에 따른 거래내역 get
    private List<InvoiceDataEntity> getInvoicedataList(String ovsCd, String fiscalMonth){
        return invoiceDataRepository.findAllByOvsCdAndFiscalMonth(ovsCd,fiscalMonth);
    }
    //1. 인보이스 만들기
    private List<AccountingSlipInvoiceNumEntity> createInvoiceList(String ovsCd, String month) {
        accountingSlipRepository.deleteAllByOvsCdAndFiscalMonth(ovsCd, month);
        invoiceNumRepository.deleteAllByOvsCdAndFiscalMonth(ovsCd, month);
        List<AccountingSlipInvoiceNumEntity> invoiceNumEntityList = new ArrayList<>(); // 리턴값
        List<InvoiceDataEntity> findedInvoiceDataList = getInvoicedataList(ovsCd, month); // 거래내역

        for (int i = 0; i < findedInvoiceDataList.size(); i++) {
            InvoiceDataEntity invoiceData = findedInvoiceDataList.get(i);
            //if(invoiceData.getAccountingSlipInvoiceNum() != null) continue;
            String invoice = "OAM" + "-" + invoiceData.getOvsCd() + "-" + String.format("%04d", i + 1);

            // 이미 같은 식별자를 가진 엔터티가 있는지 확인
            Optional<AccountingSlipInvoiceNumEntity> existingInvoiceNumEntity = invoiceNumRepository.findByInvoiceNum(invoice);
            if (existingInvoiceNumEntity.isEmpty()) {
                try {
                    AccountingSlipInvoiceNumEntity invoiceNumEntity = AccountingSlipInvoiceNumEntity.builder()
                            .invoiceNum(invoice)
                            .ovsCd(ovsCd)
                            .fiscalMonth(month)
                            .invoiceDataEntity(invoiceData)
                            .tranNum(invoiceNumRepository.countByFiscalMonthIs(invoiceData.getFiscalMonth()))
                            .build();

                    invoiceNumEntity.setInvoiceDataEntity(invoiceData);
                    invoiceData.setAccountingSlipInvoiceNum(invoiceNumEntity);
                    //invoiceNumRepository.save(invoiceNumEntity);
                    invoiceNumEntityList.add(invoiceNumEntity);
                } catch (Exception e) {
                    // 중복 예외 처리
                    // 이미 같은 식별자를 가진 엔터티가 다른 세션에서 저장되었을 경우
                    // 여기서 예외를 잡고 계속 진행하도록 처리
                    e.printStackTrace(); // 원하는 로깅 방식으로 변경하세요
                }
            }
        }

        return invoiceNumEntityList;
    }

    //2. 거래자료 하나당 3개의 회계전표 라인 만들기
    //계정코드 api 호출
    private List<AccountingSlipEntity> creatAccountingSlip(InvoiceDataEntity invoiceDataEntity){
        List<AccountingSlipEntity> created = new ArrayList<>();
        AccountingSlipEntity accountingSlip1;
        AccountingSlipEntity accountingSlip2;
        AccountingSlipEntity accountingSlip3;
        String account2;
        String txCd2;
        //차변1(비용)이 +인 경우
        // 차변2(전도금)는 111121-0000 고정 , 식별코드는 차변1과 동일
        //차변1(비용)이 -인 경우
        // 차변2(전도금)은 A204 900302-0000 고정
        //대변은 210301-0000으로 고정

        String currCode = (invoiceDataEntity.getDepCurr() == null ||invoiceDataEntity.getDepCurr().isEmpty() ) ? invoiceDataEntity.getWdCurr() : invoiceDataEntity.getDepCurr();
        BigDecimal amount1 = (invoiceDataEntity.getDepCurr() == null || invoiceDataEntity.getDepCurr().isEmpty())? invoiceDataEntity.getWithdrawal() : invoiceDataEntity.getDeposit();
        BigDecimal transAmount1;
        if(amount1.compareTo(BigDecimal.ZERO)>0){
            account2 = "111121-0000";
            txCd2 = invoiceDataEntity.getTranCd();


        }else{
            account2 = "210301-0000";
            txCd2 = "A204";
        }

        if(currCode.equals("USD")){
            transAmount1 = amount1.multiply(BigDecimal.valueOf(1350));
        } else if (invoiceDataEntity.getWdCurr().equals("ARS")) {
            transAmount1 = amount1.multiply(BigDecimal.valueOf(1.58));
        }else {
            transAmount1 = amount1;
        }
        System.out.println(invoiceDataEntity.getTranCd());
        accountingSlip1 = AccountingSlipEntity.builder()
                .account(String.valueOf(GLcodeEnum.getValuesByCode(invoiceDataEntity.getTranCd()).get(0))+ "-"+
                        String.valueOf(GLcodeEnum.getValuesByCode(invoiceDataEntity.getTranCd()).get(1)))
                .amount(amount1)
                .drCr(1L)
                .tranNum(invoiceDataEntity.getAccountingSlipInvoiceNum().getTranNum()+1)
                .currCode(currCode)
                //.krwAmount(invoiceDataEntity.getTransAmount())
                .krwAmount(transAmount1)
                .exchangeRate(invoiceDataEntity.getExchangeRate())
                .ovsCd(invoiceDataEntity.getOvsCd())
                .description(invoiceDataEntity.getDescription())
                .txDate(invoiceDataEntity.getTxDate())
                .tranCd(invoiceDataEntity.getTranCd())
                .fiscalMonth(invoiceDataEntity.getFiscalMonth())
                .build();

        accountingSlip2 = AccountingSlipEntity.builder()
                .account(account2)
                .tranCd(txCd2)
                .amount(amount1.negate())
                .drCr(1L)
                .tranNum(invoiceDataEntity.getAccountingSlipInvoiceNum().getTranNum()+1)
                .currCode(currCode)
                //.krwAmount(invoiceDataEntity.getTransAmount().negate())
                .krwAmount(transAmount1.negate())
                .exchangeRate(invoiceDataEntity.getExchangeRate())
                .ovsCd(invoiceDataEntity.getOvsCd())
                .description(invoiceDataEntity.getDescription())
                .txDate(invoiceDataEntity.getTxDate())
                .fiscalMonth(invoiceDataEntity.getFiscalMonth())
                .build();

        //ToDo: 답변에 따라서 txCd 변경하기
        accountingSlip3 = AccountingSlipEntity.builder()
                .account("210301-0000") //전도금 받는 건지 나가는 건지 확인
                .amount(BigDecimal.valueOf(0))
                .tranCd(invoiceDataEntity.getTranCd())
                .drCr(0L)
                .tranNum(invoiceDataEntity.getAccountingSlipInvoiceNum().getTranNum()+1)
                .currCode(currCode)
                .krwAmount(BigDecimal.valueOf(0))
                .exchangeRate((float) 0)
                .ovsCd(invoiceDataEntity.getOvsCd())
                .description(invoiceDataEntity.getDescription())
                .txDate(invoiceDataEntity.getTxDate())
                .fiscalMonth(invoiceDataEntity.getFiscalMonth())
                .build();
        accountingSlip1.setAccountingSlipInvoiceNumEntity(invoiceDataEntity.getAccountingSlipInvoiceNum());
        accountingSlip2.setAccountingSlipInvoiceNumEntity(invoiceDataEntity.getAccountingSlipInvoiceNum());
        accountingSlip3.setAccountingSlipInvoiceNumEntity(invoiceDataEntity.getAccountingSlipInvoiceNum());
        created.add(accountingSlip1);
        accountingSlipRepository.save(accountingSlip1);
        System.out.println(accountingSlip1);
        created.add(accountingSlip2);
        accountingSlipRepository.save(accountingSlip2);
        created.add(accountingSlip3);
        accountingSlipRepository.save(accountingSlip3);

        return created;
    };

    /*
    * 1. 인보이스엔티티 만들기
    * 2. 인보이스 엔티티에 따라서 회계전표 만들기
    *   //식별코드에 따라서 계정코드 불러와서 저장
            //차대 만들기

    * */
    //위의 메서드를 사용해서 회계전표 생성하는 메서드
    public List<AccountingSlipEntity> createAccountingSlip(String ovsCd, String month){
        List<AccountingSlipInvoiceNumEntity> invoiceList = createInvoiceList(ovsCd, month);
        List<AccountingSlipEntity> accountingSlipEntityList =new ArrayList<>();
        for(int i=0; i<invoiceList.size(); i++){
            System.out.println(invoiceList.get(i).getInvoiceNum());
            accountingSlipEntityList.addAll(creatAccountingSlip(invoiceList.get(i).getInvoiceDataEntity()));
        }
        return accountingSlipEntityList;
    }


    //회계전표 읽기
    public List<AccountingSlipDTO> findAccoutingSlipList(String ovsCd, String fiscalMonth){
        List<AccountingSlipEntity> accountingSlipEntityList = accountingSlipRepository.findByOvsCdIsAndFiscalMonthIs(ovsCd, fiscalMonth);
        //System.out.println(accountingSlipEntityList.get(0));
        return accountingSlipEntityList.stream()
                .map(entity -> AccountingSlipDTO.toDto(entity, entity.getAccountingSlipInvoiceNumEntity().getInvoiceDataEntity()))
                .collect(Collectors.toList());
    }

    //거래 내역을 상태에 따라서 가져오기
    //결재 승인 페이지
    public List<InvoiceResponseDTO> findInvoiceData(String ovsCd, String fiscalMonth, String status){
        List<InvoiceDataEntity> invoiceDataEntityList =getInvoicedataList(ovsCd, fiscalMonth, status);
        return invoiceDataEntityList.stream().map(i -> InvoiceResponseDTO.toDTO(i)).collect(Collectors.toList());
    }

    //거래 내역 상태 바꿔주기
    //결재 승인 페이지, 회계전표(거래 내역 재작성), 회계전표(AP 전송)
    public List<InvoiceResponseDTO> updateInvoiceData(String ovsCd, String fiscalMonth, String status){
        List<InvoiceDataEntity> invoiceDataEntityList = getInvoicedataList(ovsCd, fiscalMonth);
        for(int i=0; i<invoiceDataEntityList.size(); i++){
            InvoiceDataEntity invoiceData = invoiceDataEntityList.get(i);
            invoiceData.setStatus(status);
            invoiceDataRepository.save(invoiceData);
        }
        return invoiceDataEntityList.stream().map(i -> InvoiceResponseDTO.toDTO(i)).collect(Collectors.toList());
    }
}
