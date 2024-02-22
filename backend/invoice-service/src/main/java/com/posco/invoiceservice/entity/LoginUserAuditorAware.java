package com.posco.invoiceservice.entity;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.Optional;

// CreatedBy와 LastModifiedBy를 위한 파일
@RequiredArgsConstructor
@Component
public class LoginUserAuditorAware implements AuditorAware<String> {

    private final HttpSession httpSession;
    @Override
    public Optional<String> getCurrentAuditor() {
        UserEntity user = (UserEntity) httpSession.getAttribute("user");
        if(user==null) return null;
        return Optional.ofNullable(user.getName());
    }
}
