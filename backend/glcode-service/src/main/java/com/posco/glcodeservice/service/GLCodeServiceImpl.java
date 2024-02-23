package com.posco.glcodeservice.service;

import com.posco.glcodeservice.dto.GLCodeDTO;
import com.posco.glcodeservice.entity.GLCodeEntity;
import com.posco.glcodeservice.entity.ReferenceEntity;
import com.posco.glcodeservice.repository.GLCodeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GLCodeServiceImpl implements GLCodeService{

    private final GLCodeRepository glCodeRepository;

    public GLCodeServiceImpl(GLCodeRepository glCodeRepository){
        this.glCodeRepository = glCodeRepository;
    }

    @Override
    public List<GLCodeDTO> getAllGLCodes() {
        List<GLCodeEntity> glCodeEntities = glCodeRepository.findAll();
        return glCodeEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<GLCodeDTO> getGLCodeByMajorCT(String majorCt) {
        List<GLCodeEntity> glCodeMajorCtEntity = glCodeRepository.findByMajorCt(majorCt);
        return glCodeMajorCtEntity.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public GLCodeDTO getGLCodeByTranCd(String tranCd) {
        GLCodeEntity glCodeEntity = glCodeRepository.findByTranCd(tranCd);
        return (glCodeEntity != null) ? convertToDTO(glCodeEntity) : null;
    }

    @Override
    public GLCodeDTO createGLCode(GLCodeDTO glCodeDTO) {
        GLCodeEntity glCodeEntity = insertGLCodeEntity(glCodeDTO);
        GLCodeEntity savedEntity = glCodeRepository.save(glCodeEntity);
        return convertToDTO(savedEntity);
    }

    @Override
    public boolean deleteGLCodeByTranCd(String tranCd) {
        GLCodeEntity glCodeEntity = glCodeRepository.findByTranCd(tranCd);
        if (glCodeEntity != null) {
            glCodeRepository.delete(glCodeEntity);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteGLCodeById(Long glCodeId) {
        GLCodeEntity glCodeEntity = glCodeRepository.findByGlCodeId(glCodeId);
        if (glCodeEntity != null) {
            glCodeRepository.delete(glCodeEntity);
            return true;
        }
        return false;
    }

    @Override
    public GLCodeDTO updateGLCode(GLCodeDTO updatedGLCodeDTO) {
        // Check if the GLCode with the provided ID exists
        GLCodeEntity existingGLCodeEntity = glCodeRepository.findByGlCodeId(updatedGLCodeDTO.getGlCodeId());
        if (existingGLCodeEntity == null) {
            // Handle the case where the GLCode with the provided ID does not exist
            // You can throw an exception or return null or handle it as per your application's logic
            // For simplicity, let's return null here
            return null;
        }

        // Update the existing entity with the new values
        existingGLCodeEntity.setTranCd(updatedGLCodeDTO.getTranCd());
        existingGLCodeEntity.setAccountName(updatedGLCodeDTO.getAccountName());
        existingGLCodeEntity.setAccount(updatedGLCodeDTO.getAccount());
        existingGLCodeEntity.setSubAccount(updatedGLCodeDTO.getSubAccount());
        existingGLCodeEntity.setDepositCd(updatedGLCodeDTO.getDepositCd());
        existingGLCodeEntity.setDeptReqFlag(updatedGLCodeDTO.getDeptReqFlag());
        existingGLCodeEntity.setMajorCt(updatedGLCodeDTO.getMajorCt());
        existingGLCodeEntity.setMediumCt(updatedGLCodeDTO.getMediumCt());
        existingGLCodeEntity.setMinorCt(updatedGLCodeDTO.getMinorCt());
        existingGLCodeEntity.setDescription(updatedGLCodeDTO.getDescription());
        existingGLCodeEntity.setAdditionalComment(updatedGLCodeDTO.getAdditionalComment());

        // Save the updated entity
        GLCodeEntity updatedGLCodeEntity = glCodeRepository.save(existingGLCodeEntity);

        // Convert and return the updated DTO
        return convertToDTO(updatedGLCodeEntity);
    }

    private GLCodeDTO convertToDTO(GLCodeEntity glCodeEntity) {
        return GLCodeDTO.builder()
                .glCodeId(glCodeEntity.getGlCodeId())
                .ovsCd(glCodeEntity.getOvsCd())
                .tranCd(glCodeEntity.getTranCd())
                .accountName(glCodeEntity.getAccountName())
                .account(glCodeEntity.getAccount())
                .subAccount(glCodeEntity.getSubAccount())
                .depositCd(glCodeEntity.getDepositCd())
                .deptReqFlag(glCodeEntity.getDeptReqFlag())
                .majorCt(glCodeEntity.getMajorCt())
                .mediumCt(glCodeEntity.getMediumCt())
                .minorCt(glCodeEntity.getMinorCt())
                .description(glCodeEntity.getDescription())
                .additionalComment(glCodeEntity.getAdditionalComment())
                // 필요시 추가
                .build();
    }

    private GLCodeEntity convertToEntity(GLCodeDTO glCodeDTO) {                             //glCodeId 자동값 넣지 않는다.
        return GLCodeEntity.builder()
                .glCodeId(glCodeDTO.getGlCodeId())
                .ovsCd(glCodeDTO.getOvsCd())
                .tranCd(glCodeDTO.getTranCd())
                .accountName(glCodeDTO.getAccountName())
                .account(glCodeDTO.getAccount())
                .subAccount(glCodeDTO.getSubAccount())
                .description(glCodeDTO.getDescription())
                .majorCt(glCodeDTO.getMajorCt())
                .mediumCt(glCodeDTO.getMediumCt())
                .minorCt(glCodeDTO.getMinorCt())
                .description(glCodeDTO.getDescription())
                .additionalComment(glCodeDTO.getAdditionalComment())
                // 필요시 추가
                .build();
    }


    private GLCodeEntity insertGLCodeEntity(GLCodeDTO glCodeDTO) {                          //glCodeId 자동값 넣지 않는다.
        return GLCodeEntity.builder()
                .ovsCd(glCodeDTO.getOvsCd())
                .tranCd(glCodeDTO.getTranCd())
                .accountName(glCodeDTO.getAccountName())
                .account(glCodeDTO.getAccount())
                .subAccount(glCodeDTO.getSubAccount())
                .depositCd(glCodeDTO.getDepositCd())
                .deptReqFlag(glCodeDTO.getDeptReqFlag())
                .majorCt(glCodeDTO.getMajorCt())
                .mediumCt(glCodeDTO.getMediumCt())
                .minorCt(glCodeDTO.getMinorCt())
                .description(glCodeDTO.getDescription())
                .additionalComment(glCodeDTO.getAdditionalComment())
                .build();
    }

}
