package com.posco.ocrservice.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.codec.binary.Base64;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin(origins = "${react.url}")
@Controller
public class OcrController {
    @Value("${ocr.post.url}") String OCR_POST_URL;
    @Value("${ocp.key}") String OCP_KEY;
    @Value("${ocr.get.url.1}") String OCR_GET_URI1;
    @Value("${ocr.get.url.2}") String OCR_GET_URI2;


    // 이미지 받아오기
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile file) {
        try {
            // 이미지 처리
            // Convert MultipartFile to Base64
            String base64Image = convertMultipartFileToBase64(file);
            System.out.println(base64Image);

            // OCR 분석
            sendPostRequest(base64Image);

            // 성공적으로 이미지를 받았을 때 응답
            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (Exception e) {
            // 이미지를 받는 중에 에러가 발생한 경우 처리
            return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
        }
    }

    // 이미지를 base64로 변환
    private String convertMultipartFileToBase64(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return Base64.encodeBase64String(bytes);
    }

    // post response의 operation-location에서 operationId 추출
    public static String extractResultId(String location) {
        String regex = "/([^/]+)\\?";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(location);

        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return "";
        }
    }

    // post 요청 (ocr 분석)
    public void sendPostRequest(String base64Image) {
        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Ocp-Apim-Subscription-Key", OCP_KEY);

        // POST 요청 보내기
        String apiUrl = OCR_POST_URL;

        ClientResponse clientResponse = webClient.post()
                .uri(apiUrl)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .body(BodyInserters.fromValue(Collections.singletonMap("base64Source", base64Image)))
                .exchange()
                .block();

        if (clientResponse != null && clientResponse.statusCode().is2xxSuccessful()) {
            // 응답 헤더에서 operation-location 추출
            HttpHeaders responseHeaders = clientResponse.headers().asHttpHeaders();
            String operationLocation = responseHeaders.getFirst("Operation-Location");
            System.out.println("Operation Location: " + operationLocation);

            // resultId 추출
            String resultId = extractResultId(operationLocation);
            System.out.println("resultId: " + resultId);

            // get 요청
            sendGetRequest(resultId);

        } else {
            System.out.println("요청 중 오류 발생");
        }
    }

    // get 요청 (ocr 결과 받기)
    public void sendGetRequest(String resultId) {
        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Ocp-Apim-Subscription-Key", OCP_KEY);

        // GET 요청 보내기
        String apiUrl = OCR_GET_URI1 + resultId + OCR_GET_URI2;

        Mono<String> responseBody = webClient.get()
                .uri(apiUrl)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class);

        try {
            // 1초(1000 밀리초) 동안 딜레이
            Thread.sleep(1000); // running 시간 위해 추가
            responseBody.subscribe(
                    response -> {
                        System.out.println("GET 요청 성공: " + response);

                        // 데이터 파싱하여 DB에 저장 & 프론트로 전송

                    },
                    error -> System.err.println("GET 요청 실패: " + error.getMessage())
            );
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

}
