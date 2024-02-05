package com.posco.summaryservice.service;

import com.posco.summaryservice.dto.request.LoginDTO;
import com.posco.summaryservice.dto.request.RegisterDTO;
import com.posco.summaryservice.dto.request.UpdateDTO;
import com.posco.summaryservice.dto.response.TokenDTO;
import com.posco.summaryservice.dto.response.UserDTO;

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
