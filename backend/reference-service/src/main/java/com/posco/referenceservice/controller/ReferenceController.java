package com.posco.referenceservice.controller;

import com.posco.referenceservice.dto.OvsCodeDTO;
import com.posco.referenceservice.dto.ReferenceDTO;
import com.posco.referenceservice.service.ReferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin-office")
@Tag(name = "[ADMIN-OFFICE] Admin API")
public class ReferenceController {

    private final ReferenceService referenceService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping
    @Operation(summary = "Get all references", description = "Get a list of all references.")
    public ResponseEntity<?> getAllReferences() {
        Map<String, Object> resultMap = new HashMap<>();
        List<ReferenceDTO> referenceList = referenceService.getAllReferences();

        if (referenceList.isEmpty()) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "No references found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "References retrieved successfully.");
        resultMap.put("referenceList", referenceList);

        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/codeList")
    @Operation(summary = "사무소 코드 리스트 가져오기", description = "")
    public ResponseEntity getOvsCodeList(){
        Map<String, Object> resultMap = new HashMap<>();
        List<OvsCodeDTO> ovsList = referenceService.getOvsCodeList();

        if(ovsList.isEmpty()){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "사무소 코드가 없음");
            return ResponseEntity.badRequest().body(resultMap);
        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "사무소 코드 리스트 가져오기 성공");
        resultMap.put("ovsCodeList", ovsList);
        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/{ovsCd}")
    @Operation(summary = "Get reference by office name", description = "Get a reference by its office name.")
    public ResponseEntity<?> getReferenceByOvsCd(@PathVariable String ovsCd) {
        Map<String, Object> resultMap = new HashMap<>();
        ReferenceDTO reference = referenceService.getReferenceByOvsCd(ovsCd);

        if (reference == null) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "Reference not found for office: " + ovsCd);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "Selected Reference retrieved successfully.");
        resultMap.put("reference", reference);

        return ResponseEntity.ok().body(resultMap);
    }

    @PostMapping
    @Operation(summary = "Create a new reference", description = "Create a new reference.")
    public ResponseEntity<?> createReference(@RequestBody ReferenceDTO referenceDTO) {
        Map<String, Object> resultMap = new HashMap<>();
        ReferenceDTO createdReference = referenceService.createReference(referenceDTO);

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "Reference created successfully.");
        resultMap.put("reference", createdReference);

        return ResponseEntity.status(HttpStatus.CREATED).body(resultMap);
    }

    @DeleteMapping("/{ovsCd}")
    @Operation(summary = "Delete reference by office name", description = "Delete a reference by its office name.")
    public ResponseEntity<?> deleteReferenceByOvsCd(@PathVariable String ovsCd) {
        Map<String, Object> resultMap = new HashMap<>();
        boolean deleted = referenceService.deleteReferenceByOvsCd(ovsCd);

        if (!deleted) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "Reference not found for office: " + ovsCd);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "Reference deleted successfully.");

        return ResponseEntity.ok().body(resultMap);
    }

    @PutMapping
    @Operation(summary = "Update reference", description = "Update a reference")
    public ResponseEntity<?> updateReference(@Valid @RequestBody ReferenceDTO updatedReferenceDTO) {
        Map<String, Object> resultMap = new HashMap<>();

        // Check if the reference with the provided office code exists
        ReferenceDTO existingReference = referenceService.getReferenceByOvsCd(updatedReferenceDTO.getOvsCd());
        if (existingReference == null) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "Reference not found for office: " + updatedReferenceDTO.getOvsCd());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        // Update the existing reference with the provided data
        ReferenceDTO updatedReference = referenceService.updateReference(updatedReferenceDTO);
        if (updatedReference == null) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "Failed to update reference for office: " + updatedReferenceDTO.getOvsCd());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "Reference updated successfully.");
        resultMap.put("reference", updatedReference);

        return ResponseEntity.ok().body(resultMap);
    }
}
