package com.posco.userservice.service;

import com.posco.userservice.dto.request.RegisterDTO;
import com.posco.userservice.dto.response.TokenDTO;
import com.posco.userservice.entity.UserEntity;
import com.posco.userservice.repository.UserRepository;
import com.posco.userservice.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public TokenDTO registerUser(RegisterDTO registerDTO) {
        UserEntity userEntity = UserEntity.builder()
                .userId(registerDTO.getUserId())
                .name(registerDTO.getName())
                .password(registerDTO.getPassword())
                .build();
        userRepository.save(userEntity);

        String accessToken = jwtTokenProvider.createAccessToken(userEntity);
        String refreshToken = jwtTokenProvider.createRefreshToken(userEntity.getId());

        UserEntity newUserEntity = UserEntity.builder()
                .id(userEntity.getId())
                .userId(userEntity.getUserId())
                .name(userEntity.getName())
                .password(userEntity.getPassword())
                .startDate(userEntity.getStartDate())
                .endDate(userEntity.getEndDate())
                .build();
        userRepository.save(newUserEntity);

        return TokenDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
