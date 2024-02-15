package com.example.ocr_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class OcrController {

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile file) {
        try {
            // 이미지 처리


            // 성공적으로 이미지를 받았을 때 응답
            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (Exception e) {
            // 이미지를 받는 중에 에러가 발생한 경우 처리
            return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
        }
    }
}
