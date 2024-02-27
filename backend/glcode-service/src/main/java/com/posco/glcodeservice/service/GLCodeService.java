package com.posco.glcodeservice.service;

import com.posco.glcodeservice.dto.GLCodeDTO;

import java.util.List;

public interface GLCodeService {

    List<GLCodeDTO> getAllGLCodes();

    List<GLCodeDTO> getGLCodeByMajorCT(String majorCt);

    GLCodeDTO getGLCodeByTranCd(String tranCd);

    GLCodeDTO createGLCode(GLCodeDTO glCodeDTO);

    List<GLCodeDTO> createGLCodeList(List<GLCodeDTO> glCodeDTOList);

    boolean deleteGLCodeByTranCd(String transCd);

    boolean deleteGLCodeById(Long glCodeId);

    GLCodeDTO updateGLCode(GLCodeDTO updatedGLCodeDTO);

}
