package com.team_damda.domain.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;


import java.io.IOException;
import java.io.PrintWriter;


@Slf4j
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler{

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // 로그아웃 성공 응답 설정
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        try (PrintWriter writer = response.getWriter()) {
            writer.write("{\"message\":\"로그아웃 성공\"}");
            log.info("사용자 {} 로그아웃 완료", authentication != null ? authentication.getName() : "Anonymous");
        } catch (IOException e) {
            log.info("사용자 {} 로그아웃 실패", authentication != null ? authentication.getName() : "Anonymous");
            throw new RuntimeException("로그아웃 성공 응답 실패", e);
        }

    }
}