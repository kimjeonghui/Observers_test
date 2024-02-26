package com.posco.ocrservice.controller;

import com.posco.ocrservice.entity.OcrEntity;
import com.posco.ocrservice.service.OcrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@CrossOrigin(origins = "${react.url}")
@Controller
public class OcrController {
    @Autowired
    private OcrService ocrService;

    @PostMapping("/upload")
    public ResponseEntity<OcrEntity> handleFileUpload(@RequestParam("image") MultipartFile file) throws IOException {
        OcrEntity ocrData = ocrService.processImage(file);
        return new ResponseEntity<>(ocrData, HttpStatus.OK);
    }
}
