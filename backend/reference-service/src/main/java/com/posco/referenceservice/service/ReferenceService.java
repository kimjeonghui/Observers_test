package com.posco.referenceservice.service;

import com.posco.referenceservice.dto.OvsCodeDTO;
import com.posco.referenceservice.dto.ReferenceDTO;

import java.util.List;

public interface ReferenceService {

    List<ReferenceDTO> getAllReferences();

    List<OvsCodeDTO> getOvsCodeList();

    ReferenceDTO getReferenceByOvsCd(String ovsCd);

    ReferenceDTO createReference(ReferenceDTO referenceDTO);

    ReferenceDTO updateReference(ReferenceDTO updatedReferenceDTO);

    boolean deleteReferenceByOvsCd(String ovsCd);
}
