package com.posco.ocrservice.service;

import com.posco.ocrservice.dto.request.OcrDTO;
import com.posco.ocrservice.dto.request.OcrDetailDTO;
import com.posco.ocrservice.entity.OcrDetailEntity;
import com.posco.ocrservice.entity.OcrEntity;
import com.posco.ocrservice.repository.OcrDetailRepository;
import com.posco.ocrservice.repository.OcrRepository;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
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

@Service
public class OcrService {
    @Value("${ocr.post.url}")
    private String OCR_POST_URL;

    @Value("${ocp.key}")
    private String OCP_KEY;

    @Value("${ocr.get.url.1}")
    private String OCR_GET_URI1;

    @Value("${ocr.get.url.2}")
    private String OCR_GET_URI2;

    @Autowired
    private OcrRepository ocrRepository;

    @Autowired
    private OcrDetailRepository ocrDetailRepository;

    public OcrEntity processImage(MultipartFile file) throws IOException {
        String base64Image = convertMultipartFileToBase64(file);
        OcrEntity result = sendPostRequest(base64Image);
        return result;
    }

    private String convertMultipartFileToBase64(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return Base64.encodeBase64String(bytes);
    }

    private OcrEntity sendPostRequest(String base64Image) {
        OcrEntity ocrEntity = null;

        WebClient webClient = WebClient.create();
        HttpHeaders headers = createHttpHeaders();

        String apiUrl = OCR_POST_URL;
        ClientResponse clientResponse = webClient.post()
                .uri(apiUrl)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .body(BodyInserters.fromValue(Collections.singletonMap("base64Source", base64Image)))
                .exchange()
                .block();

        if (clientResponse != null && clientResponse.statusCode().is2xxSuccessful()) {
            HttpHeaders responseHeaders = clientResponse.headers().asHttpHeaders();
            String operationLocation = responseHeaders.getFirst("Operation-Location");

            String resultId = extractResultId(operationLocation);

            // Get request
            ocrEntity = sendGetRequest(resultId);
        } else {
            System.out.println("Error during the request");
        }
        return ocrEntity;
    }

    private OcrEntity sendGetRequest(String resultId) {
        WebClient webClient = WebClient.create();
        HttpHeaders headers = createHttpHeaders();
        String apiUrl = OCR_GET_URI1 + resultId + OCR_GET_URI2;

        Mono<String> responseBody = webClient.get()
                .uri(apiUrl)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class);

        try {
            Thread.sleep(3000);
            // Use block to wait for the response
            String response = responseBody.block();

            if (response != null) {
                return handleGetResponse(response);
            } else {
                System.err.println("GET request failed: No response");
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return null;
    }

    private HttpHeaders createHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Ocp-Apim-Subscription-Key", OCP_KEY);
        return headers;
    }

    private OcrEntity handleGetResponse(String response) {
        System.out.println("GET request successful: " + response);
        OcrDTO ocrDTO = jsonParsing(response);
        OcrEntity ocrEntity = ocrDTO.toEntity(ocrDTO);
        OcrEntity ocrSaved = ocrRepository.save(ocrEntity);

        List<OcrDetailDTO> ocrDetailDTOList = detailJsonParsing(response, ocrSaved);
        ocrDetailDTOList.forEach(detailDTO -> {
            detailDTO.setOcrId(ocrSaved.getOcrId());
            OcrDetailEntity entity = OcrDetailDTO.toEntity(detailDTO);
            entity.setOcrEntity(ocrSaved);
            ocrDetailRepository.save(entity);
        });

        System.out.println(ocrSaved.toString());
        System.out.println(ocrDetailDTOList.toString());

        return ocrSaved;
    }


    private String extractResultId(String location) {
        String regex = "/([^/]+)\\?";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(location);

        return matcher.find() ? matcher.group(1) : "";
    }

    private OcrDTO jsonParsing(String response) {
        // Ocr entity
        String storeName = null;
        String purDate = null;
        Double totalPrice = null;

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

                    // TransactionDate
                    JSONObject transactionDateObject = (JSONObject) fields.get("TransactionDate");
                    purDate = (String) transactionDateObject.get("valueDate");

                    // TotalPrice
                    JSONObject totalObject = (JSONObject) fields.get("Total");
                    totalPrice = (Double) totalObject.get("valueNumber");
                }
            }
        } catch (ParseException e) {
            // ParseException이 발생했을 때 처리
            e.printStackTrace();
        }

        return new OcrDTO(storeName, purDate, totalPrice);
    }

    private List<OcrDetailDTO> detailJsonParsing(String response, OcrEntity ocrEntity) {
        String description;
        Double unitPrice;
        Double sumPrice;
        Long count;
        List<OcrDetailDTO> ocrDetailDTOList = new ArrayList<>();

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

                            // Description
                            JSONObject descriptionObject = (JSONObject) valueObject.get("Description");
                            description = (String) descriptionObject.get("content");

                            // unitPrice
                            JSONObject priceObject = (JSONObject) valueObject.get("Price");
                            unitPrice = (Double) priceObject.get("valueNumber");

                            // Quantity
                            JSONObject countObject = (JSONObject) valueObject.get("Quantity");
                            count = (Long) countObject.get("valueNumber");

                            // sumPrice
                            JSONObject sumPriceObject = (JSONObject) valueObject.get("TotalPrice");
                            sumPrice = (Double) sumPriceObject.get("valueNumber");

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

        return ocrDetailDTOList;
    }
}
