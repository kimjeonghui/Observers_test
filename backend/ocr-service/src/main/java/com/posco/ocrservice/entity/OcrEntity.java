package com.posco.ocrservice.entity;

import com.posco.ocrservice.dto.request.OcrDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "pos_ocr")
public class OcrEntity extends BaseEntity {
    @Id
    @Column(name = "ocr_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ocrId;             // 식별자

    @Column(nullable = false)
    private String purDate;         // 거래 날짜

    @Column(nullable = false)
    private String storeName;       // 거래처 명

    @Column(nullable = false)
    private Double totalVal;        // 총 금액

    @OneToMany(mappedBy = "ocrEntity")
    private List<OcrDetailEntity> detailList;

    public static OcrDTO toDTO(OcrEntity ocrEntity) {
        return OcrDTO.builder()
                .storeName(ocrEntity.getStoreName())
                .purDate(ocrEntity.getPurDate())
                .totalVal(ocrEntity.getTotalVal())
                .build();
    }

    @Override
    public String toString() {
        return "ReceiptOCR { \n" +
                "storeName = " + storeName + "\n" + "purDate = " + purDate + "\n" + "totalVal = " + totalVal + " }";
    }
}
