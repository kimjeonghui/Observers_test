package com.posco.accountingservice.service;

import com.posco.accountingservice.dto.request.LoginDTO;
import com.posco.accountingservice.dto.request.RegisterDTO;
import com.posco.accountingservice.dto.response.TokenDTO;

public interface UserService {
    TokenDTO registerUser(RegisterDTO registerDTO);
    TokenDTO loginUser(LoginDTO loginDTO);
    boolean checkExistName(String name);
}
