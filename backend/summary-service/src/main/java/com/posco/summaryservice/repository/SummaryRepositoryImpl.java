package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.QSummaryEntity;
import com.posco.summaryservice.entity.QUserEntity;
import com.posco.summaryservice.entity.SummaryEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
@Slf4j
public class SummaryRepositoryImpl implements SummaryRepositoryCustom {
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
