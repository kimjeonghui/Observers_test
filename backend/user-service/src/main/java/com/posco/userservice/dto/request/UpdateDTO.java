package com.posco.userservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class UpdateDTO {
    @NotNull
    private String name;
    @NotNull
    private String description;

    private String password;

    private String email;

    private String ovsCd;

    private String role;

    private String endDate;
}
