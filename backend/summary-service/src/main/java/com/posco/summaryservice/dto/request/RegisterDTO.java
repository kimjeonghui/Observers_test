package com.posco.summaryservice.dto.request;

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
    private String name;
    @NotNull
    private String description;
    @NotNull
    private String password;
    @NotNull
    private String email;

    private String ovsCd;

    private String role;
}
