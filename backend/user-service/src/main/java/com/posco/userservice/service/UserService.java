package com.posco.userservice.service;

import com.posco.userservice.dto.request.LoginDTO;
import com.posco.userservice.dto.request.RegisterDTO;
import com.posco.userservice.dto.request.UpdateDTO;
import com.posco.userservice.dto.response.LoginUserDTO;
import com.posco.userservice.dto.response.TokenDTO;
import com.posco.userservice.dto.response.UserDTO;
import com.posco.userservice.entity.UserEntity;

import java.util.List;

public interface UserService {
    UserEntity registerUser(RegisterDTO registerDTO);
    LoginUserDTO loginUser(LoginDTO loginDTO);
    boolean checkExistName(String name);
    List<UserDTO> getUserListByOvsCode(String ovsCd);
//    List<UserDTO> getUserListByName(String name);
//    List<UserDTO> getUserListByDescription(String description);
//    List<UserDTO> getUserListByEmail(String email);
    List<UserDTO> searchUserList(String subject, String value);
    LoginUserDTO updateUser(UpdateDTO updateDTO);
    void deleteUser(String name);
    List<UserDTO> getUserList();
    UserDTO getUser(String name);
    TokenDTO makeToken(String name);
}
