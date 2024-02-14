package com.posco.referenceservice.service;

import com.posco.referenceservice.dto.ReferenceDTO;

import java.util.List;

public interface ReferenceService {

    List<ReferenceDTO> getAllReferences();

    ReferenceDTO getReferenceByOvsCd(String ovsCd);

    ReferenceDTO createReference(ReferenceDTO referenceDTO);

    boolean deleteReferenceByOvsCd(String ovsCd);
}
