package com.posco.userservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class LoginUserDTO {
    private String name;
    private String description;
    private String email;
    private String ovsCd;
    private String ovsMeaning;
    private String role;
}
