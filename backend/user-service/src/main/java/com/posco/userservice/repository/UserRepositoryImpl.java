package com.posco.userservice.repository;

import com.posco.userservice.entity.QUserEntity;
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
    public Long updateUserIdById(Long id, String userId) {
        QUserEntity qUser = QUserEntity.userEntity;
        Long updateCnt = queryFactory.update(qUser)
                .set(qUser.userId, userId)
                .where(qUser.id.eq(id))
                .execute();
        return updateCnt;
    }
}
