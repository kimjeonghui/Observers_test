package com.posco.userservice.util;

import com.posco.userservice.dto.response.UserDTO;
import com.posco.userservice.entity.UserEntity;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    private static Key KEY;
    private static Long ACCESSTOKEN_EXPIRED_PERIOD;
    private static Long REFRESHTOKEN_EXPIRED_PERIOD;

    @Autowired
    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey,
                            @Value("${jwt.access_time}") Long accessTime,
                            @Value("${jwt.refresh_time}") Long refreshTime){
        ACCESSTOKEN_EXPIRED_PERIOD = accessTime;
        REFRESHTOKEN_EXPIRED_PERIOD = refreshTime;
        byte[] KeyBytes = Decoders.BASE64.decode(secretKey);
        KEY = Keys.hmacShaKeyFor(KeyBytes);
    }

    // accessToken 생성
    public String createAccessToken(UserEntity userEntity){
        long now = (new Date()).getTime();
        Date accessTokenExpire = new Date(now + ACCESSTOKEN_EXPIRED_PERIOD);
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setExpiration(accessTokenExpire)
                .claim("name", userEntity.getName())
                .claim("description", userEntity.getDescription())
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // refreshToken 생성
    public String createRefreshToken(String name) {
        long now = (new Date()).getTime();
        Date refreshTokenExpire = new Date(now + REFRESHTOKEN_EXPIRED_PERIOD);
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setExpiration(refreshTokenExpire)
                .claim("name", name)
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // JWT Token 복호화
    public Authentication getAuthentication(String accessToken){
        Claims claims = parseClaims(accessToken);

        if(claims.get("name")==null){
            throw new RuntimeException("정보가 없는 토큰입니다.");
        }

        String name = (String) claims.get("name");
//        Long id = Long.valueOf(integerId);

        UserDTO userDTO = UserDTO.builder()
                .name(name)
                .description((String)claims.get("description"))
                .build();

        return new UsernamePasswordAuthenticationToken(userDTO, "", new ArrayList<>());
    }

    // token 유효성 검증
    public boolean validateToken(String token) {
        try{
            Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("유효하지 않은 토큰입니다.", e);
            throw new JwtException("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);
        } catch (ExpiredJwtException e) {
            log.info("만료된 토큰입니다.", e);
            throw new JwtException("만료된 토큰입니다.", HttpStatus.FORBIDDEN);
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않는 토큰입니다.", e);
            throw new JwtException("지원하지 않는 토큰입니다.", HttpStatus.UNAUTHORIZED);
        } catch (IllegalArgumentException e) {
            log.info("토큰의 클레임이 비어있습니다", e);
            throw new JwtException("토큰의 클레임이 비어있습니다", HttpStatus.PRECONDITION_FAILED);
        }
    }

    // accessToken으로 claim 정보 얻음
    public static Claims parseClaims(String accessToken){
        try {
            return Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e){
            return e.getClaims();
        }
    }
}
