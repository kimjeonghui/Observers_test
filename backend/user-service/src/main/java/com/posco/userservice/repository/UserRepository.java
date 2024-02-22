package com.posco.userservice.repository;

import com.posco.userservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, String>, UserRepositoryCustom {
    UserEntity findByName(String name);
    void deleteByName(String name);
    List<UserEntity> findAllByOvsCd(String ovsCd);
}
