package com.posco.summaryservice.dto.request;

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

    private String role;

    private LocalDateTime endDate;
}
