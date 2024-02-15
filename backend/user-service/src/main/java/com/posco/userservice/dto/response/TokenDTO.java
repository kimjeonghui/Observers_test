package com.posco.userservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class TokenDTO {
    private String grantType;
    @NotNull
    private String accessToken;
    @NotNull
    private String refreshToken;
}
