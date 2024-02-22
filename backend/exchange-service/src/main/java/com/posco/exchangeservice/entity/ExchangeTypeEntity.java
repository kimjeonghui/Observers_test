package com.posco.exchangeservice.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "pos_ovs_exchange_type")
public class ExchangeTypeEntity extends BaseEntity{

    @Id
    @Column(nullable = false, updatable = false)
    private String rateType;

}
