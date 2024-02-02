package com.posco.userservice.service;

import com.posco.userservice.dto.request.LoginDTO;
import com.posco.userservice.dto.request.RegisterDTO;
import com.posco.userservice.dto.response.TokenDTO;
import com.posco.userservice.entity.UserEntity;
import com.posco.userservice.repository.UserRepository;
import com.posco.userservice.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    @Override
    public TokenDTO registerUser(RegisterDTO registerDTO) {
        UserEntity userEntity = UserEntity.builder()
                .name(registerDTO.getName())
                .description(registerDTO.getName())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .email(registerDTO.getEmail())
                .ovsCd(registerDTO.getOvsCd())
                .role(registerDTO.getRole())
                .build();
        userRepository.save(userEntity);

        String accessToken = jwtTokenProvider.createAccessToken(userEntity);
        String refreshToken = jwtTokenProvider.createRefreshToken(userEntity.getName());

//        UserEntity newUserEntity = UserEntity.builder()
//                .name(userEntity.getName())
//                .description(userEntity.getDescription())
//                .password(userEntity.getPassword())
//                .startDate(userEntity.getStartDate())
//                .endDate(userEntity.getEndDate())
//                .build();
//        userRepository.save(newUserEntity);

        return TokenDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public TokenDTO loginUser(LoginDTO loginDTO) {
        UserEntity userEntity = userRepository.findById(loginDTO.getName()).orElseThrow();
        if(!passwordEncoder.matches(loginDTO.getPassword(), userEntity.getPassword())){
            return null;
        }

        String accessToken = jwtTokenProvider.createAccessToken(userEntity);
        String refreshToken = jwtTokenProvider.createRefreshToken(userEntity.getName());

//        UserEntity newUserEntity = UserEntity.builder()
//                .name(userEntity.getName())
//                .description(userEntity.getDescription())
//                .password(userEntity.getPassword())
//                .startDate(userEntity.getStartDate())
//                .endDate(userEntity.getEndDate())
//                .build();
//        userRepository.save(newUserEntity);

        return TokenDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public boolean checkExistName(String name) {
        UserEntity userEntity = userRepository.findByName(name);
        return userEntity != null;
    }
}
