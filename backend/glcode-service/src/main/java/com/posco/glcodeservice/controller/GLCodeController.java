package com.posco.glcodeservice.controller;

import com.posco.glcodeservice.dto.GLCodeDTO;
import com.posco.glcodeservice.entity.GLCodeEntity;
import com.posco.glcodeservice.service.GLCodeService;
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
@RequestMapping("gl-code")
@Tag(name = "[GL-CODE] GLCode API")
public class GLCodeController {

    private final GLCodeService glCodeService;

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    @GetMapping
    @Operation(summary = "Get all GLCodes", description = "Get a list of all general ledge codes.")
    public ResponseEntity<?> getAllGLCodes(){
        Map<String,Object> resultMap = new HashMap<>();
        List<GLCodeDTO> glCodeList = glCodeService.getAllGLCodes();

        if (glCodeList.isEmpty()) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "No glCodes found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "GLCodes were retrieved successfully.");
        resultMap.put("glCodeList", glCodeList);

        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/major/{majorCt}")
    @Operation(summary = "Get GLCode by majorCt", description = "Get a general ledge code by major criteria")
    public ResponseEntity<?> getGLCodeByMajorCT(@PathVariable String majorCt){
        Map<String, Object> resultMap = new HashMap<>();
        List<GLCodeDTO> glCode = glCodeService.getGLCodeByMajorCT(majorCt);

        if(glCode == null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "No glCodes found for majorCt." + majorCt);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "Major Category - Selected GLCode was retrieved successfully.");
        resultMap.put("glCodes", glCode);

        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/tran/{tranCd}")
    @Operation(summary = "Get GLCode by tranCd", description = "Get a general ledge code by transaction code")
    public ResponseEntity<?> getGLCodeByTranCd(@PathVariable String tranCd){
        Map<String, Object> resultMap = new HashMap<>();
        GLCodeDTO glCode = glCodeService.getGLCodeByTranCd(tranCd);

        if(glCode == null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "No tranCd found for tranCd." + tranCd);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "Transaction Code - Selected GLCode was retrieved successfully.");
        resultMap.put("glCodes", glCode);

        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/{glCodeId}")
    @Operation(summary = "Get GLCode by ID", description = "Get a general ledge code by transaction code")
    public ResponseEntity<?> getGLCodeById(@PathVariable Long glCodeId){
        Map<String, Object> resultMap = new HashMap<>();
        GLCodeDTO glCode = glCodeService.getGLCodeById(glCodeId);

        if(glCode == null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "No ID found for glCodeId." + glCodeId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "ID - Selected GLCode was retrieved successfully.");
        resultMap.put("glCode", glCode);

        return ResponseEntity.ok().body(resultMap);
    }

    @PostMapping
    @Operation(summary = "Create a new GLCodes", description = "Create a new general ledge code.")
    public ResponseEntity<?> createGLCode(@RequestBody GLCodeDTO glCodeDTO) {
        Map<String, Object> resultMap = new HashMap<>();
        GLCodeDTO createGLCode = glCodeService.createGLCode(glCodeDTO);
        
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "GLCode created successfully.");
        resultMap.put("glCode", createGLCode);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(resultMap);
    }

    @PostMapping("/list")
    @Operation(summary = "Create GLCodes using list", description = "Create new general ledger codes all at once by having a list inserted.")
    public ResponseEntity<?> createGLCodeList(@Valid @RequestBody List<GLCodeDTO> glCodeDTOList) {
        List<GLCodeDTO> createdGLCodes = glCodeService.createGLCodeList(glCodeDTOList);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "GLCodes created successfully.");
        resultMap.put("glCodes", createdGLCodes);

        return ResponseEntity.status(HttpStatus.CREATED).body(resultMap);
    }


    @DeleteMapping("/delete/{tranCd}")
    @Operation(summary = "Delete glCode by tranCd", description = "Delete a general ledge code by transcation code")
    public ResponseEntity<?> deleteGLCodeByTranCd(@PathVariable String tranCd) {
        Map<String, Object> resultMap = new HashMap<>();
        boolean deleted = glCodeService.deleteGLCodeByTranCd(tranCd);

        if (!deleted) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "GLCode was not found using tranCd: " + tranCd);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "GLCode deleted successfully.");

        return ResponseEntity.ok().body(resultMap);
    }

    @DeleteMapping("/{glCodeId}")
    @Operation(summary = "Delete glCode by glCodeId", description = "Delete a general ledge code by ID")
    public ResponseEntity<?> deleteGLCodeById(@PathVariable Long glCodeId) {
        Map<String, Object> resultMap = new HashMap<>();
        boolean deleted = glCodeService.deleteGLCodeById(glCodeId);

        if (!deleted) {
            resultMap.put("result", FAIL);
            resultMap.put("msg", "GLCode was not found using glCodeId: " + glCodeId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "GLCode deleted successfully.");

        return ResponseEntity.ok().body(resultMap);
    }


    // 수정이 필요하다 작동불가
    @PutMapping
    @Operation(summary = "Update a GLCode by Transaction Code", description = "Update an existing GLCode using its Transaction Code.")
    public ResponseEntity<?> updateGLCode(@Valid @RequestBody GLCodeDTO updatedGLCodeDTO) {
        Map<String, Object> resultMap = new HashMap<>();

        // Check if the GLCode with the provided ID exists
        GLCodeDTO existingGLCode = glCodeService.getGLCodeByTranCd(updatedGLCodeDTO.getTranCd());
        if (existingGLCode == null) {
            resultMap.put("result", "FAIL");
            resultMap.put("msg", "GLCode not found for transaction code: " + updatedGLCodeDTO.getTranCd());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
        }

        // Update the existing GLCode with the provided data
        GLCodeDTO updatedGLCode = glCodeService.updateGLCode(updatedGLCodeDTO);
        if (updatedGLCode == null) {
            resultMap.put("result", "FAIL");
            resultMap.put("msg", "Failed to update GLCode for transaction code: " + updatedGLCodeDTO.getTranCd());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resultMap);
        }

        resultMap.put("result", "SUCCESS");
        resultMap.put("msg", "GLCode updated successfully.");
        resultMap.put("glCode", updatedGLCode);

        return ResponseEntity.ok().body(resultMap);
    }


    @PutMapping("/{glCodeId}")
    @Operation(summary = "Update a GLCode by ID", description = "Update an existing GLCode using its ID.")
    public ResponseEntity<?> updateGLCode(@PathVariable Long glCodeId, @RequestBody GLCodeDTO updatedGLCodeDTO) {
        // Set the glCodeId for the updatedGLCodeDTO
        updatedGLCodeDTO.setGlCodeId(glCodeId);

        // Call the service to update the GLCode
        GLCodeDTO updatedGLCode = glCodeService.updateGLCode(updatedGLCodeDTO);

        if (updatedGLCode == null) {
            // Handle the case where the GLCode with the provided ID does not exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("GLCode with ID " + glCodeId + " not found.");
        }

        // Return a success response with the updated GLCode
        return ResponseEntity.ok()
                .body("GLCode with ID " + glCodeId + " updated successfully.");
    }

}
