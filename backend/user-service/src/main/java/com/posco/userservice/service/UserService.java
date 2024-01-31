package com.posco.userservice.service;

import com.posco.userservice.dto.request.LoginDTO;
import com.posco.userservice.dto.request.RegisterDTO;
import com.posco.userservice.dto.response.TokenDTO;

public interface UserService {
    TokenDTO registerUser(RegisterDTO registerDTO);

    TokenDTO loginUser(LoginDTO loginDTO);
}
