package com.posco.referenceservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class OvsCodeDTO {
    private String OvsCd;
    private String OvsMeaning;
}
