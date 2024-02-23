package com.posco.glcodeservice.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class GLCodeDTO {

    @Setter
    private Long glCodeId;
    private String ovsCd;
    private String tranCd;
    private String accountName;
    private Long account;
    private Long subAccount;
    private Long depositCd;
    private String deptReqFlag;
    private String majorCt;
    private String mediumCt;
    private String minorCt;
    private String description;
    private String additionalComment;

}
