package com.posco.summaryservice.repository;

import com.posco.summaryservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String>, UserRepositoryCustom {
    UserEntity findByName(String name);
    void deleteByName(String name);
}
