package com.posco.accountingservice.util;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

public class JwtException extends AuthenticationException {
    private final HttpStatus status;

    public JwtException(String msg, HttpStatus status){
        super(msg);
        this.status = status;
    }
}
