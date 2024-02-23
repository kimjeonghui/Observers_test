package com.posco.userservice.service;

import com.posco.userservice.dto.request.LoginDTO;
import com.posco.userservice.dto.request.RegisterDTO;
import com.posco.userservice.dto.request.UpdateDTO;
import com.posco.userservice.dto.response.LoginUserDTO;
import com.posco.userservice.dto.response.TokenDTO;
import com.posco.userservice.dto.response.UserDTO;
import com.posco.userservice.entity.UserEntity;
import com.posco.userservice.repository.UserRepository;
import com.posco.userservice.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserEntity registerUser(RegisterDTO registerDTO) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.of(LocalDate.from(LocalDateTime.parse(registerDTO.getStartDate()+" 00:00:00", formatter)), LocalTime.of(0, 0, 0));
        LocalDateTime end = LocalDateTime.of(LocalDate.from(LocalDateTime.parse(registerDTO.getEndDate()+" 00:00:00", formatter)), LocalTime.of(23, 59, 59));
        UserEntity userEntity = UserEntity.builder()
                .name(registerDTO.getName())
                .description(registerDTO.getName())
//                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .password(registerDTO.getPassword())
                .email(registerDTO.getEmail())
                .ovsCd(registerDTO.getOvsCd())
                .ovsMeaning(registerDTO.getOvsMeaning())
                .role(registerDTO.getRole())
                .startDate(start)
                .endDate(end)
                .build();

//        UserEntity newUserEntity = UserEntity.builder()
//                .name(userEntity.getName())
//                .description(userEntity.getDescription())
//                .password(userEntity.getPassword())
//                .email(userEntity.getEmail())
//                .ovsCd(userEntity.getOvsCd())
//                .role(userEntity.getRole())
//                .build();
//        UserEntity user = userRepository.save(newUserEntity);
        return userRepository.save(userEntity);
    }

    @Override
    public LoginUserDTO loginUser(LoginDTO loginDTO) {
        UserEntity userEntity = userRepository.findById(loginDTO.getName()).orElseThrow();
//        if(!passwordEncoder.matches(loginDTO.getPassword(), userEntity.getPassword())){
//            return null;
//        }
        if(!loginDTO.getPassword().equals(userEntity.getPassword())){
            return null;
        }
//        String accessToken = jwtTokenProvider.createAccessToken(userEntity);
//        String refreshToken = jwtTokenProvider.createRefreshToken(userEntity.getName());
//
//        UserEntity newUserEntity = UserEntity.builder()
//                .name(userEntity.getName())
//                .description(userEntity.getDescription())
//                .password(userEntity.getPassword())
//                .email(userEntity.getEmail())
//                .ovsCd(userEntity.getOvsCd())
//                .role(userEntity.getRole())
//                .refreshToken(refreshToken)
//                .build();
//        userRepository.save(newUserEntity);

        return LoginUserDTO.builder()
                .name(userEntity.getName())
                .description(userEntity.getDescription())
                .email(userEntity.getEmail())
                .ovsCd(userEntity.getOvsCd())
                .ovsMeaning(userEntity.getOvsMeaning())
                .role(userEntity.getRole())
                .build();
    }

    @Override
    public boolean checkExistName(String name) {
        UserEntity userEntity = userRepository.findByName(name);
        return userEntity == null;
    }

    @Override
    public List<UserDTO> getUserListByOvsCode(String ovsCd) {
        List<UserEntity> userEntityList = userRepository.findAllByOvsCd(ovsCd);
        List<UserDTO> userDTOList = new ArrayList<>();
        for(UserEntity userEntity: userEntityList){
            UserDTO userDTO = UserDTO.builder()
                    .name(userEntity.getName())
                    .description(userEntity.getDescription())
                    .email(userEntity.getEmail())
                    .ovsCd(userEntity.getOvsCd())
                    .ovsMeaning(userEntity.getOvsMeaning())
                    .role(userEntity.getRole())
                    .startDate(userEntity.getStartDate())
                    .endDate(userEntity.getEndDate())
                    .build();
            userDTOList.add(userDTO);
        }
        return userDTOList;
    }

    @Override
    public List<UserDTO> searchUserList(String subject, String value) {
        List<UserEntity> userEntityList = null;
        List<UserDTO> userDTOList = new ArrayList<>();
        if(subject.equals("name")){
            log.info("이름으로 찾음");
            userEntityList = userRepository.findAllByName(value);
        } else if(subject.equals("description")){
            userEntityList = userRepository.findAllByDescription(value);
        } else if(subject.equals("email")){
            userEntityList = userRepository.findAllByEmail(value);
        } else{
            userEntityList = userRepository.findAllByRole(value);
        }
        for(UserEntity userEntity : userEntityList){
            UserDTO userDTO = UserDTO.builder()
                    .name(userEntity.getName())
                    .description(userEntity.getDescription())
                    .email(userEntity.getEmail())
                    .ovsCd(userEntity.getOvsCd())
                    .ovsMeaning(userEntity.getOvsMeaning())
                    .role(userEntity.getRole())
                    .startDate(userEntity.getStartDate())
                    .endDate(userEntity.getEndDate())
                    .build();
            userDTOList.add(userDTO);
        }
        log.info("length"+userDTOList.size());
        return userDTOList;
    }

    @Override
    public LoginUserDTO updateUser(UpdateDTO updateDTO) {
        UserEntity userEntity = userRepository.findByName(updateDTO.getName());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime end = LocalDateTime.of(LocalDate.from(LocalDateTime.parse(updateDTO.getEndDate()+" 00:00:00", formatter)), LocalTime.of(23, 59, 59));

        UserEntity updateUser = UserEntity.builder()
                .name(updateDTO.getName())
                .description(updateDTO.getDescription())
                .password(updateDTO.getPassword()==null?userEntity.getPassword():updateDTO.getPassword())
                .email(updateDTO.getEmail()==null?userEntity.getEmail():updateDTO.getEmail())
                .ovsCd(updateDTO.getOvsCd()==null?userEntity.getOvsCd():updateDTO.getOvsCd())
                .ovsMeaning(updateDTO.getOvsMeaning())
                .role(updateDTO.getRole())
                .startDate(userEntity.getStartDate())
                .endDate(end)
                .build();
//        userRepository.save(updateUser);

//        String accessToken = jwtTokenProvider.createAccessToken(updateUser);
//        String refreshToken = jwtTokenProvider.createRefreshToken(updateUser.getName());
//
//        UserEntity newUserEntity = UserEntity.builder()
//                .name(updateUser.getName())
//                .description(updateUser.getDescription())
//                .password(updateUser.getPassword())
//                .email(updateUser.getEmail())
//                .ovsCd(updateUser.getOvsCd())
//                .role(updateUser.getRole())
//                .refreshToken(refreshToken)
//                .startDate(updateUser.getStartDate())
//                .endDate(updateUser.getEndDate())
//                .build();
        userRepository.save(updateUser);

        return LoginUserDTO.builder()
                .name(updateUser.getName())
                .description(updateUser.getDescription())
                .email(updateUser.getEmail())
                .ovsCd(updateUser.getOvsCd())
                .ovsMeaning(updateUser.getOvsMeaning())
                .role(updateUser.getRole())
                .build();
    }

    @Override
    public void deleteUser(String name) {
        userRepository.deleteByName(name);
    }

    @Override
    public List<UserDTO> getUserList() {
        List<UserEntity> userEntityList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();

        for(UserEntity userEntity: userEntityList){
            UserDTO userDTO = UserDTO.builder()
                    .name(userEntity.getName())
                    .description(userEntity.getDescription())
                    .email(userEntity.getEmail())
                    .ovsCd(userEntity.getOvsCd())
                    .ovsMeaning(userEntity.getOvsMeaning())
                    .role(userEntity.getRole())
                    .startDate(userEntity.getStartDate())
                    .endDate(userEntity.getEndDate())
                    .build();
            userDTOList.add(userDTO);
        }
        return userDTOList;
    }

    @Override
    public UserDTO getUser(String name) {
        UserEntity userEntity = userRepository.findByName(name);

        return UserDTO.builder()
                .name(userEntity.getName())
                .description(userEntity.getDescription())
                .email(userEntity.getEmail())
                .ovsCd(userEntity.getOvsCd())
                .ovsMeaning(userEntity.getOvsMeaning())
                .role(userEntity.getRole())
                .startDate(userEntity.getStartDate())
                .endDate(userEntity.getEndDate())
                .build();
    }

    @Override
    public TokenDTO makeToken(String name) {
        UserEntity userEntity = userRepository.findByName(name);

        String accessToken = jwtTokenProvider.createAccessToken(userEntity);
        String refreshToken = jwtTokenProvider.createRefreshToken(userEntity.getName());

        UserEntity newUserEntity = UserEntity.builder()
                .name(userEntity.getName())
                .description(userEntity.getDescription())
                .password(userEntity.getPassword())
                .email(userEntity.getEmail())
                .ovsCd(userEntity.getOvsCd())
                .role(userEntity.getRole())
                .refreshToken(refreshToken)
                .build();
        userRepository.save(newUserEntity);

        return TokenDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
