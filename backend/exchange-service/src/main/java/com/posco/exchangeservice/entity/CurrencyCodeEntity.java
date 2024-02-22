package com.posco.exchangeservice.entity;

import lombok.*;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "pos_ovs_curr_code")
public class CurrencyCodeEntity extends BaseEntity {

    @Id
    @Column(nullable = false)
    private String currCode;

    @Column(nullable = false)
    private String currName;

    @Column(nullable = false)
    private String country;

}
