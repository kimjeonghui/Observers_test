package com.posco.ocrservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.codec.binary.Base64;

import java.io.IOException;

@Controller
public class OcrController {

    @CrossOrigin(origins = "${react.url}")
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile file) {
        try {
            // 이미지 처리
            // Convert MultipartFile to Base64
            String base64Image = convertMultipartFileToBase64(file);


//            System.out.println(base64Image);
            // 성공적으로 이미지를 받았을 때 응답
            return ResponseEntity.ok("Image uploaded successfully! Base64: " + base64Image);
        } catch (Exception e) {
            // 이미지를 받는 중에 에러가 발생한 경우 처리
            return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
        }
    }

    private String convertMultipartFileToBase64(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return Base64.encodeBase64String(bytes);
    }
}
