package com.posco.summaryservice.controller;

import com.posco.summaryservice.dto.request.SummaryDTO;
import com.posco.summaryservice.entity.SummaryContentsEntity;
import com.posco.summaryservice.entity.SummaryEntity;
import com.posco.summaryservice.service.SummaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/summaries")
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
}
