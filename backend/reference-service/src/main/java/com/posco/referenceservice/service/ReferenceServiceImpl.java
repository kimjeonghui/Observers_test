package com.posco.referenceservice.service;

import com.posco.referenceservice.dto.OvsCodeDTO;
import com.posco.referenceservice.dto.ReferenceDTO;
import com.posco.referenceservice.entity.ReferenceEntity;
import com.posco.referenceservice.repository.ReferenceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReferenceServiceImpl implements ReferenceService {

    private final ReferenceRepository referenceRepository;

    public ReferenceServiceImpl(ReferenceRepository referenceRepository) {
        this.referenceRepository = referenceRepository;
    }

    @Override
    public List<ReferenceDTO> getAllReferences() {
        List<ReferenceEntity> referenceEntities = referenceRepository.findAll();
        return referenceEntities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<OvsCodeDTO> getOvsCodeList() {
        List<OvsCodeDTO> OvsCodes = new ArrayList<>();
        List<ReferenceEntity> referenceDTOS = referenceRepository.findAll();
        for(ReferenceEntity ovsCode: referenceDTOS){
            OvsCodeDTO ovsCodeDTO = OvsCodeDTO.builder()
                    .OvsCd(ovsCode.getOvsCd())
                    .OvsMeaning(ovsCode.getOvsMeaning())
                    .build();
            OvsCodes.add(ovsCodeDTO);
        }
        return OvsCodes;
    }

    @Override
    public ReferenceDTO getReferenceByOvsCd(String ovsCd) {
        ReferenceEntity referenceEntity = referenceRepository.findByOvsCd(ovsCd);
        return (referenceEntity != null) ? convertToDTO(referenceEntity) : null;
    }

    @Override
    public ReferenceDTO createReference(ReferenceDTO referenceDTO) {
        ReferenceEntity referenceEntity = convertToEntity(referenceDTO);
        ReferenceEntity savedEntity = referenceRepository.save(referenceEntity);
        return convertToDTO(savedEntity);
    }

    @Override
    public boolean deleteReferenceByOvsCd(String ovsCd) {
        ReferenceEntity referenceEntity = referenceRepository.findByOvsCd(ovsCd);
        if (referenceEntity != null) {
            referenceRepository.delete(referenceEntity);
            return true;
        }
        return false;
    }

    @Override
    public ReferenceDTO updateReference(ReferenceDTO updatedReferenceDTO) {
        // Retrieve the existing reference entity from the repository using the ovsCd in updatedReferenceDTO
        ReferenceEntity existingReferenceEntity = referenceRepository.findByOvsCd(updatedReferenceDTO.getOvsCd());
        if (existingReferenceEntity == null) {
            // Reference not found, return null or throw an exception as per your requirement
            return null;
        }

        // Update the existing reference entity with data from the updated DTO
        existingReferenceEntity.setOvsMeaning(updatedReferenceDTO.getOvsMeaning());
        existingReferenceEntity.setOvsCopCd(updatedReferenceDTO.getOvsCopCd());
        existingReferenceEntity.setGlCurr(updatedReferenceDTO.getGlCurr());
        existingReferenceEntity.setLocCurr(updatedReferenceDTO.getLocCurr());
        existingReferenceEntity.setLocCurr2(updatedReferenceDTO.getLocCurr2());
        existingReferenceEntity.setTransCurr(updatedReferenceDTO.getTransCurr());
        existingReferenceEntity.setTransCurr2(updatedReferenceDTO.getTransCurr2());
        existingReferenceEntity.setStartDate(updatedReferenceDTO.getStartDate());
        existingReferenceEntity.setEndDate(updatedReferenceDTO.getEndDate());
        // Update other fields as needed

        // Save the updated reference entity back to the repository
        existingReferenceEntity = referenceRepository.save(existingReferenceEntity);

        // Convert the updated entity to DTO and return it
        return convertToDTO(existingReferenceEntity);
    }

    // Helper method to convert Entity to DTO
    private ReferenceDTO convertToDTO(ReferenceEntity referenceEntity) {
        return ReferenceDTO.builder()
                .ovsCd(referenceEntity.getOvsCd())
                .ovsMeaning(referenceEntity.getOvsMeaning())
                .ovsCopCd(referenceEntity.getOvsCopCd())
                .glCurr(referenceEntity.getGlCurr())
                .locCurr(referenceEntity.getLocCurr())
                .locCurr2(referenceEntity.getLocCurr2())
                .transCurr(referenceEntity.getTransCurr())
                .transCurr2(referenceEntity.getTransCurr2())
                .startDate(referenceEntity.getStartDate())
                .endDate(referenceEntity.getEndDate())
                // Add other fields as needed
                .build();
    }

    // Helper method to convert DTO to Entity
    private ReferenceEntity convertToEntity(ReferenceDTO referenceDTO) {
        return ReferenceEntity.builder()
                .ovsCd(referenceDTO.getOvsCd())
                .ovsMeaning(referenceDTO.getOvsMeaning())
                .ovsCopCd(referenceDTO.getOvsCopCd())
                .glCurr(referenceDTO.getGlCurr())
                .locCurr(referenceDTO.getLocCurr())
                .locCurr2(referenceDTO.getLocCurr2())
                .transCurr(referenceDTO.getTransCurr())
                .transCurr2(referenceDTO.getTransCurr2())
                .startDate(referenceDTO.getStartDate())
                .endDate(referenceDTO.getEndDate())
                // Add other fields as needed
                .build();
    }
}
