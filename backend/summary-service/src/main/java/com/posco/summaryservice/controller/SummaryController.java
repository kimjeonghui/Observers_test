package com.posco.summaryservice.controller;

import com.posco.summaryservice.dto.request.SummaryDTO;
import com.posco.summaryservice.dto.response.SummaryResponseDTO;
import com.posco.summaryservice.entity.SummaryContentsEntity;
import com.posco.summaryservice.entity.SummaryEntity;
import com.posco.summaryservice.service.SummaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;


@RestController
@RequestMapping("/summary")
@Tag(name = "[SUMMARY] Month Summary API")
@Slf4j
@RequiredArgsConstructor
public class SummaryController {

    private final SummaryService summaryService;
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    @PostMapping
    @Operation(summary = "Insert summary", description = "")
    public ResponseEntity<?> createSummary (@RequestBody SummaryDTO summaryDTO){
        Map<String, Object> resultMap = new HashMap<>();
        // summary가 있는지 확인하고 없으면 summary 생성
        SummaryEntity summaryEntity = summaryService.createSummary(summaryDTO);
        if(summaryEntity==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "월 총괄표 생성 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }
        // 해당 식별코드의 summary content 추가
        SummaryContentsEntity summaryContentsEntity = summaryService.createSummaryContent(summaryEntity, summaryDTO);
        if(summaryContentsEntity==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "월 총괄표 내용 입력 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "월 총괄표 입력 성공");
        return ResponseEntity.ok().body(resultMap);
    }

    @PostMapping("/list")
    @Operation(summary = "Insert summary list", description = "")
    public ResponseEntity<?> createSummaryList (@RequestBody List<SummaryDTO> summaryDTOs){
        Map<String, Object> resultMap = new HashMap<>();
        // summary가 있는지 확인하고 없으면 summary 생성
        SummaryEntity summaryEntity = summaryService.createSummary(summaryDTOs.get(0));
        if(summaryEntity==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "월 총괄표 생성 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }
        // 해당 식별코드의 summary content 추가
        List<SummaryContentsEntity> contents = new ArrayList<>();
        for(SummaryDTO summaryDTO: summaryDTOs){
            contents.add(summaryService.createSummaryContent(summaryEntity, summaryDTO));
        }
        if(contents.isEmpty()){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "월 총괄표 내용 입력 실패");
            return ResponseEntity.badRequest().body(resultMap);
        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "월 총괄표 입력 성공");
        return ResponseEntity.ok().body(resultMap);
    }

    @GetMapping("/{ovsCd}/{fiscalMonth}")
    public ResponseEntity<?> getSummary (@PathVariable String ovsCd, @PathVariable String fiscalMonth){
        Map<String, Object> resultMap = new HashMap<>();
        SummaryResponseDTO responseDTO = summaryService.getSummaryContents(ovsCd, fiscalMonth);
        if(responseDTO==null){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "해당 월의 월 총괄표가 없습니다.");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(resultMap);
        }else if(responseDTO.getContents().isEmpty()){
            resultMap.put("result", FAIL);
            resultMap.put("msg", "해당 월의 월 총괄표 내용이 없습니다.");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(resultMap);
        }
        resultMap.put("result", SUCCESS);
        resultMap.put("msg", "월 총괄표 리스트 가져오기 성공");
        resultMap.put("summary", responseDTO);
        return ResponseEntity.ok().body(resultMap);
    }
}
