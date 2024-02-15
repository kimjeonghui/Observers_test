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
public class UserDTO {
    private String name;
    private String description;
    private String email;
    private String ovsCd;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String role;
}
