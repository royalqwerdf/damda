package com.team_damda.domain.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@ControllerAdvice
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // CustomLogoutHandler에서 이미 생성된 loginType을 사용하므로 별도의 추출 로직은 필요하지 않습니다.
        // 따라서 이 메서드 내부에서 반환할 필요가 없습니다.
        log.info("사용자 {} 로그아웃 완료", authentication != null ? authentication.getName() : "Anonymous?");
    }
}
