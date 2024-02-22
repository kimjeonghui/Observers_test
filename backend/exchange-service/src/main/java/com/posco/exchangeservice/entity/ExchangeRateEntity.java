package com.posco.exchangeservice.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "pos_ovs_exchange_rate")
public class ExchangeRateEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long exchangeId;

    @Column(nullable = false)
    private String fromCurr;

    @Column(nullable = false)
    private String toCurr;

    @Column(nullable = false)
    private LocalDate rateDate;

    @Column(nullable = false)
    private Float exchangeRate;

    @Column(nullable = false, updatable = false)
    private String rateType;

}
