package com.posco.glcodeservice.service;

import com.posco.glcodeservice.dto.GLCodeDTO;

import java.util.List;

public interface GLCodeService {

    List<GLCodeDTO> getAllGLCodes();

    GLCodeDTO getGLCodeByMajorCT(String majorCt);

    GLCodeDTO createGLCode(GLCodeDTO glCodeDTO);

    boolean deleteGLCodeByTransCd(String transCd);

    GLCodeDTO updateGLCode(GLCodeDTO updatedGLCodeDTO);

}
