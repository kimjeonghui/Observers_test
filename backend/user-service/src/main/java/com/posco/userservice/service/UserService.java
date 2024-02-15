package com.posco.userservice.service;

import com.posco.userservice.dto.request.LoginDTO;
import com.posco.userservice.dto.request.RegisterDTO;
import com.posco.userservice.dto.request.UpdateDTO;
import com.posco.userservice.dto.response.TokenDTO;
import com.posco.userservice.dto.response.UserDTO;
import com.posco.userservice.entity.UserEntity;

import java.util.List;

public interface UserService {
    TokenDTO registerUser(RegisterDTO registerDTO);
    TokenDTO loginUser(LoginDTO loginDTO);
    boolean checkExistName(String name);
    TokenDTO updateUser(UpdateDTO updateDTO);
    void deleteUser(String name);
    List<UserDTO> getUserList();
    UserDTO getUser(String name);
    TokenDTO makeToken(String name);
}
