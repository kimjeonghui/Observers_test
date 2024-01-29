package com.posco.userservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class RegisterDTO {
    @NotNull
    private String userId;
    @NotNull
    private String name;
    @NotNull
    private String password;
}
