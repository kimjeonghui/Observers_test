package com.posco.userservice.controller;

import com.posco.userservice.dto.response.TokenDTO;
import com.posco.userservice.service.UserService;
import com.posco.userservice.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody TokenDTO tokenDTO){
        Map<String, Object> resultMap = new HashMap<>();
        String name = JwtTokenProvider.getNameByStringAccessToken(tokenDTO.getAccessToken());
        // 사용자 ID 존재 여부 확인
        if(userService.checkExistName(name)){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "유효하지 않은 사용자입니다.");
            return ResponseEntity.badRequest().body(resultMap);
        }
        // refreshToken 유효 여부 확인
        if(!jwtTokenProvider.validateToken(tokenDTO.getRefreshToken())) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "refresh Token이 유효하지 않습니다.");
            return ResponseEntity.badRequest().body(resultMap);
        }

        TokenDTO newToken = userService.makeToken(name);
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "토큰 재발급 성공");
        resultMap.put("accessToken", newToken.getAccessToken());
        resultMap.put("refreshToken", newToken.getRefreshToken());
        return ResponseEntity.ok().body(resultMap);
    }
}
