package com.posco.invoiceservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class EvidenceDTO {
    private Long evidenceId;        // 증빙 자료 id
    private String evidenceDir;     // 증빙 자료 경로
    private Long invoiceDataId;     // 거래 자료 연결된 fk
}
