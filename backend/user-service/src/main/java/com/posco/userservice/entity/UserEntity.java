package com.posco.userservice.entity;

import com.posco.userservice.dto.response.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name="users")
public class UserEntity extends BaseEntity{
    @Id
    @Column(nullable = false)
    private String name;                // 사번

    @Column(nullable = false)
    private String description;         // 사용자 이름

    @Column(nullable = false)
    private String password;            // 비밀 번호

    @Column(nullable = false)
    private String email;               // 이메일

    @Column
    private String ovsCd;               // 사무소 코드

    @Column(updatable = false)
    private LocalDateTime startDate;    // 시작일

    @Column
    private LocalDateTime endDate;      // 만료일

    @Column
    private String role;                // 권한

    @Column
    private String refreshToken;        // 토큰

    UserDTO toUserDTO(){
        return UserDTO.builder()
                .name(this.getName())
                .description(this.getDescription())
                .email(this.getEmail())
                .ovsCd(this.getOvsCd())
                .role(this.getRole())
                .startDate(this.getStartDate())
                .endDate(this.getEndDate())
                .build();
    }
}

