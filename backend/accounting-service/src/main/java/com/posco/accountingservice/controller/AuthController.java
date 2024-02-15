package com.posco.accountingservice.controller;

import com.posco.accountingservice.dto.request.LoginDTO;
import com.posco.accountingservice.dto.response.TokenDTO;
import com.posco.accountingservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginDTO loginDTO){
        Map<String, Object> resultMap = new HashMap<>();
        // 사용자 ID 존재 여부 확인
        if(!userService.checkExistName(loginDTO.getName())){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "유효하지 않은 사용자입니다.");
            return ResponseEntity.badRequest().body(resultMap);
        }
        // 사용자 ID, PASSWORD 일치 (로그인) 확인
        TokenDTO tokenDTO = userService.loginUser(loginDTO);
        if(tokenDTO==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "로그인 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "로그인 성공");
        resultMap.put("accessToken", tokenDTO.getAccessToken());
        resultMap.put("refreshToken", tokenDTO.getRefreshToken());
        return ResponseEntity.ok().body(resultMap);
    }
}
