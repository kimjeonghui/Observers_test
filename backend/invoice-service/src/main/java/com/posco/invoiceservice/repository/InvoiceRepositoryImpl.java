package com.posco.invoiceservice.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
@Slf4j
public class InvoiceRepositoryImpl implements InvoiceRepositoryCustom {
    private final JPAQueryFactory queryFactory;

//    @Override
//    public SummaryEntity findAllByYearMonth(LocalDateTime dateTime) {
//        QSummaryEntity qSummaryEntity = QSummaryEntity.summaryEntity;
//        SummaryEntity summaryEntity= queryFactory.selectFrom(qSummaryEntity)
//                .where(qSummaryEntity.fiscalMonth.eq(dateTime))
//                .fetch();
//        return summaryEntity;
//    }
}
