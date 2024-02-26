package com.posco.ocrservice.controller;

import com.posco.ocrservice.dto.request.OcrDTO;
import com.posco.ocrservice.dto.request.OcrDetailDTO;
import com.posco.ocrservice.entity.OcrDetailEntity;
import com.posco.ocrservice.entity.OcrEntity;
import com.posco.ocrservice.repository.OcrDetailRepository;
import com.posco.ocrservice.repository.OcrRepository;
import com.posco.ocrservice.service.OcrService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.codec.binary.Base64;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin(origins = "${react.url}")
@Controller
//@RequestMapping("/ocr-data")
public class OcrController {
    @Autowired
    private OcrService ocrService;

    @PostMapping("/upload")
    public ResponseEntity<OcrEntity> handleFileUpload(@RequestParam("image") MultipartFile file) throws IOException {
        OcrEntity ocrData = ocrService.processImage(file);
        return new ResponseEntity<>(ocrData, HttpStatus.OK);
    }
}

