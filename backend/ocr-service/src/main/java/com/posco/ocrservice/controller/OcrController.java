package com.posco.ocrservice.controller;

import com.posco.ocrservice.dto.request.OcrDTO;
import com.posco.ocrservice.dto.request.OcrDetailDTO;
import com.posco.ocrservice.entity.OcrDetailEntity;
import com.posco.ocrservice.entity.OcrEntity;
import com.posco.ocrservice.repository.OcrDetailRepository;
import com.posco.ocrservice.repository.OcrRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin(origins = "${react.url}")
@Controller
public class OcrController {
    @Value("${ocr.post.url}") String OCR_POST_URL;
    @Value("${ocp.key}") String OCP_KEY;
    @Value("${ocr.get.url.1}") String OCR_GET_URI1;
    @Value("${ocr.get.url.2}") String OCR_GET_URI2;

    @Autowired
    private OcrRepository ocrRepository;
    @Autowired
    private OcrDetailRepository ocrDetailRepository;

    // 이미지 받아오기
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile file) {
        try {
            // 이미지 처리
            // Convert MultipartFile to Base64
            String base64Image = convertMultipartFileToBase64(file);

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

        // 받은 응답
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

        // 받은 응답
        Mono<String> responseBody = webClient.get()
                .uri(apiUrl)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class);

        try {
            Thread.sleep(3000); // running 시간 위해 추가
            responseBody.subscribe(
                    response -> {
                        System.out.println("GET 요청 성공: " + response);

                        OcrDTO ocrDTO = jsonParsing(response);


                        // DTO를 Entity로 변환
                        OcrEntity ocrEntity = ocrDTO.toEntity(ocrDTO);

//                        OcrDetailDTO ocrDetailDTO = new OcrDetailDTO(null, null, null, null, ocrEntity.getOcrId());
//                        OcrDetailDTO ocrDetailDTO = detailJsonParsing(response, ocrEntity);
//                        OcrDetailEntity ocrDetailEntity = ocrDetailDTO.toEntity(ocrDetailDTO);

                        // Repository에게 Entity를 DB로 저장하게 함
                        OcrEntity ocrSaved = ocrRepository.save(ocrEntity);
                        System.out.println("ocr id: " + ocrSaved.getOcrId());
                        List<OcrDetailDTO> ocrDetailDTOList = detailJsonParsing(response, ocrSaved);
                        for(int i=0; i<ocrDetailDTOList.size(); i++){
                            ocrDetailDTOList.get(i).setOcrId(ocrSaved.getOcrId());
                            OcrDetailEntity entity = OcrDetailDTO.toEntity(ocrDetailDTOList.get(i) );
                            entity.setOcrEntity(ocrSaved);
                            ocrDetailRepository.save(entity);
                        }


                        System.out.println(ocrSaved.toString());
//                        OcrDetailEntity ocrDetailSaved = ocrDetailRepository.save(ocrDetailEntity);
//                        System.out.println(ocrDetailSaved.toString());

                        // 프론트로 전송

                    },
                    error -> System.err.println("GET 요청 실패: " + error.getMessage())
            );
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public OcrDTO jsonParsing(String response) {
        // ocr entity
        String storeName = null;
        String purDate = null;
        Double totalPrice = null;

        // ocr detail entity
        String description = null;
        Double unitPrice = null;
        Double sumPrice = null;
        Long count = null;
        OcrDetailEntity ocrDetailEntity;

        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(response);

            Object analyzeResultObject = jsonObject.get("analyzeResult");
            JSONObject analyzeResult = (JSONObject) analyzeResultObject;
            JSONArray documents = (JSONArray) analyzeResult.get("documents");

            // documents 배열 순회
            for (Object documentObject : documents) {
                if (documentObject instanceof JSONObject) {
                    JSONObject document = (JSONObject) documentObject;

                    // document 내부의 fields 객체 가져오기
                    JSONObject fields = (JSONObject) document.get("fields");

                    // MerchantName
                    JSONObject merchantNameObject = (JSONObject) fields.get("MerchantName");
                    storeName = (String) merchantNameObject.get("content");
                    System.out.println("====MerchantName====");
                    System.out.println(storeName);

                    // TransactionDate
                    JSONObject transactionDateObject = (JSONObject) fields.get("TransactionDate");
                    purDate = (String) transactionDateObject.get("valueDate");
                    System.out.println("====TransactionDate====");
                    System.out.println(purDate);

                    // TotalPrice
                    JSONObject totalObject = (JSONObject) fields.get("Total");
                    totalPrice = (Double) totalObject.get("valueNumber");
                    System.out.println("====TotalPrice====");
                    System.out.println(totalPrice);

                    // fields 내부의 Items 객체 가져오기
                    JSONObject items = (JSONObject) fields.get("Items");

                    // Items 내부의 valueArray 배열 가져오기
                    JSONArray valueArray = (JSONArray) items.get("valueArray");
                }
            }
        } catch (ParseException e) {
            // ParseException이 발생했을 때 처리
            e.printStackTrace();
        }

        OcrDTO ocrDTO = new OcrDTO(storeName, purDate, totalPrice);


        return ocrDTO;
    }

    public List<OcrDetailDTO> detailJsonParsing(String response, OcrEntity ocrEntity) {
        System.out.println(response);
        String description = null;
        Double unitPrice = null;
        Double sumPrice = null;
        Long count = null;
        List<OcrDetailDTO> ocrDetailDTOList =new ArrayList<>();

        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(response);

            Object analyzeResultObject = jsonObject.get("analyzeResult");
            JSONObject analyzeResult = (JSONObject) analyzeResultObject;
            JSONArray documents = (JSONArray) analyzeResult.get("documents");

            // documents 배열 순회
            for (Object documentObject : documents) {
                if (documentObject instanceof JSONObject) {
                    JSONObject document = (JSONObject) documentObject;

                    // document 내부의 fields 객체 가져오기
                    JSONObject fields = (JSONObject) document.get("fields");

                    // fields 내부의 Items 객체 가져오기
                    JSONObject items = (JSONObject) fields.get("Items");

                    // Items 내부의 valueArray 배열 가져오기
                    JSONArray valueArray = (JSONArray) items.get("valueArray");

                    // valueArray 배열 순회
                    for (Object itemObject : valueArray) {
                        if (itemObject instanceof JSONObject) {
                            JSONObject item = (JSONObject) itemObject;
                            JSONObject valueObject = (JSONObject) item.get("valueObject");

                            System.out.println();
                            System.out.println("<<<Item>>>");

                            // Description
                            JSONObject descriptionObject = (JSONObject) valueObject.get("Description");
                            description = (String) descriptionObject.get("content");
                            System.out.println("===description===");
                            System.out.println(description);

                            // unitPrice
                            JSONObject priceObject = (JSONObject) valueObject.get("Price");
                            unitPrice = (Double) priceObject.get("valueNumber");
                            System.out.println("===unitPrice===");
                            System.out.println(unitPrice);

                            // Quantity
                            JSONObject countObject = (JSONObject) valueObject.get("Quantity");
                            count = (Long) countObject.get("valueNumber");
                            System.out.println("===count===");
                            System.out.println(count);

                            // sumPrice
                            JSONObject sumPriceObject = (JSONObject) valueObject.get("TotalPrice");
                            sumPrice = (Double) sumPriceObject.get("valueNumber");
                            System.out.println("===sumPrice===");
                            System.out.println(sumPrice);

                            System.out.println("------------------------------------");

                            OcrDetailDTO detailDTO = new OcrDetailDTO(description, unitPrice, sumPrice, count, ocrEntity.getOcrId());
                            ocrDetailDTOList.add(detailDTO);

                        }
                    }
                }
            }

        } catch (ParseException e) {
            // ParseException이 발생했을 때 처리
            e.printStackTrace();
        }
        System.out.println(ocrDetailDTOList);

        return ocrDetailDTOList;
    }
}
