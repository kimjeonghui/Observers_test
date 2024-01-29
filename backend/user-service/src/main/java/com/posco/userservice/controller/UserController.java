package com.posco.userservice.controller;

import com.posco.userservice.dto.request.RegisterDTO;
import com.posco.userservice.dto.response.TokenDTO;
import com.posco.userservice.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "[USER] User API")
@Slf4j
public class UserController {

    private final UserService userService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    @PostMapping("/register")
    @Operation(summary = "Register user", description = "")
    public ResponseEntity registerUser(@Valid @RequestBody RegisterDTO registerDTO){
        Map<String, Object> resultMap = new HashMap<>();
        TokenDTO tokenDTO = userService.registerUser(registerDTO);

        // 회원 등록 실패
        if(tokenDTO==null){
           resultMap.put("result", FAIL);
           resultMap.put("msg", "회원등록을 실패하였습니다.");
           return ResponseEntity.internalServerError().body(resultMap);
        }

        // 회원 등록 성공
        resultMap.put("accessToken", tokenDTO.getAccessToken());
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "회원등록을 성공하였습니다.");
        return ResponseEntity.ok().body(resultMap);
    }
}
