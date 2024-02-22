package com.posco.userservice.controller;

import com.posco.userservice.dto.request.LoginDTO;
import com.posco.userservice.dto.request.RegisterDTO;
import com.posco.userservice.dto.request.UpdateDTO;
import com.posco.userservice.dto.response.LoginUserDTO;
import com.posco.userservice.dto.response.TokenDTO;
import com.posco.userservice.dto.response.UserDTO;
import com.posco.userservice.entity.UserEntity;
import com.posco.userservice.service.UserService;
import com.posco.userservice.util.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Tag(name = "[USER] User API")
@Slf4j
public class UserController {

    private final UserService userService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    @PostMapping
    @Operation(summary = "Register user", description = "")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDTO registerDTO){
        Map<String, Object> resultMap = new HashMap<>();
        UserEntity user = userService.registerUser(registerDTO);
        log.info("registerDTO"+registerDTO.toString());
        // 회원 등록 실패
        if(user==null){
           resultMap.put("result", FAIL);
           resultMap.put("msg", "회원 등록 실패");
           return ResponseEntity.badRequest().body(resultMap);
        }

        // 회원 등록 성공
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "회원 등록 성공");
        return ResponseEntity.ok().body(resultMap);
    }

    @PostMapping("/login")
    @Operation(summary = "Login user", description = "")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO){
        Map<String, Object> resultMap = new HashMap<>();
        // 사용자 ID 존재 여부 확인
        if(userService.checkExistName(loginDTO.getName())){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "유효하지 않은 사용자입니다.");
            return ResponseEntity.badRequest().body(resultMap);
        }
        // 사용자 ID, PASSWORD 일치 (로그인) 확인
        LoginUserDTO loginUserDTO = userService.loginUser(loginDTO);
        if(loginUserDTO==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "로그인 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "로그인 성공");
        resultMap.put("user", loginUserDTO);
        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping
    @Operation(summary = "Get user list", description = "")
    public ResponseEntity<?> getUserList(){
        Map<String, Object> resultMap = new HashMap<>();
        List<UserDTO> userList = userService.getUserList();
        if(userList.isEmpty()){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "사용자가 없습니다.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "사용자 리스트 호출 성공했습니다.");
        resultMap.put("userList", userList);
        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/detail/{userName}")
    @Operation(summary = "Get one user", description = "")
    public ResponseEntity<?> getUser(@PathVariable String userName){
        Map<String, Object> resultMap = new HashMap<>();

        if(userService.checkExistName(userName)){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "유효하지않은 사용자입니다.");
            return ResponseEntity.badRequest().body(resultMap);
        }
        UserDTO user = userService.getUser(userName);
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "사용자 상세 정보 가져오기 성공");
        resultMap.put("user", user);
        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/{ovsCd}")
    @Operation(summary = "Get userList By ovsCode", description = "")
    public ResponseEntity<?> getUserListByOvsCode(@PathVariable String ovsCd){
        Map<String, Object> resultMap = new HashMap<>();
        List<UserDTO> userDTOList = userService.getUserListByOvsCode(ovsCd);
//        if(userDTOList.isEmpty()){
//            resultMap.put("result", FAIL);
//            resultMap.put("msg", "해당 사무소에 소속된 사용자가 없습니다.");
//            return ResponseEntity.badRequest().body(resultMap);
//        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "사용자 리스트 가져오기 성공");
        resultMap.put("userList", userDTOList);
        return ResponseEntity.ok().body(resultMap);
    }

    @PutMapping
    @Operation(summary = "Update user", description = "")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateDTO updateDTO){
        Map<String, Object> resultMap = new HashMap<>();
        // 사용자 ID 존재 여부 확인
        if(userService.checkExistName(updateDTO.getName())){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "유효하지 않은 사용자입니다.");
            return ResponseEntity.badRequest().body(resultMap);
        }
        LoginUserDTO loginUserDTO = userService.updateUser(updateDTO);
        if(loginUserDTO==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "회원 수정 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "회원 수정 성공");
        resultMap.put("user", loginUserDTO);
        return ResponseEntity.ok().body(resultMap);
    }

    @DeleteMapping("/{name}")
    @Operation(summary = "Delete user", description = "")
    public ResponseEntity<?> deleteUser(@PathVariable String name){
        Map<String, Object> resultMap = new HashMap<>();

//        if(httpServletRequest.getHeader("Authorization")==null){
//            resultMap.put("result", FAIL);
//            resultMap.put("msg", "토큰이 없습니다.");
//            return ResponseEntity.badRequest().body(resultMap);
//        }
//        String role = JwtTokenProvider.getRoleByAccessToken(httpServletRequest);
//        if(!role.equals("ADMIN")){
//            resultMap.put("result", FAIL);
//            resultMap.put("msg", "삭제 권한이 없습니다.");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resultMap);
//        }
        if(userService.checkExistName(name)){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "사용자가 존재하지 않습니다.");
            return ResponseEntity.badRequest().body(resultMap);
        }
        userService.deleteUser(name);
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "사용자 삭제 성공");
        return ResponseEntity.ok().body(resultMap);
    }
}
