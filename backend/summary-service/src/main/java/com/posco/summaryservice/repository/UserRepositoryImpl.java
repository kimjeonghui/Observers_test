package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.QUserEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
@Slf4j
public class UserRepositoryImpl implements UserRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    @Override
    public Long updateDescriptionByName(String name, String description) {
        QUserEntity qUser = QUserEntity.userEntity;
        Long updateCnt = queryFactory.update(qUser)
                .set(qUser.name, name)
                .where(qUser.description.eq(description))
                .execute();
        return updateCnt;
    }
}
