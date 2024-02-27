package com.posco.accountingservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class InvoiceDataStatusDTO {
    @NotNull
    private String status;
}
