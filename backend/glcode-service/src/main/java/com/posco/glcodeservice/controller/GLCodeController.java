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

    @GetMapping("/{majorCt}")
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
        resultMap.put("msg", "Selected GLCode was retrieved successfully.");
        resultMap.put("glCodes", glCode);

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

    @DeleteMapping("/tranCd/{tranCd}")
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

}
