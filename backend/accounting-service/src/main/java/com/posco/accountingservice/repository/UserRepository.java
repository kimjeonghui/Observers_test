package com.posco.accountingservice.repository;

import com.posco.accountingservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String>, UserRepositoryCustom {
    UserEntity findByName(String name);
}
