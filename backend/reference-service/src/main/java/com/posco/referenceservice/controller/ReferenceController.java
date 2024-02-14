package com.posco.referenceservice.controller;

import com.posco.referenceservice.dto.ReferenceDTO;
import com.posco.referenceservice.service.ReferenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        resultMap.put("msg", "Reference retrieved successfully.");
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
}
