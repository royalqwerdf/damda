package com.team_damda.domain.controller;

import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.service.JwtService;
import com.team_damda.domain.service.LogoutService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping
public class LogoutController {

    private final LogoutService logoutService;
    private final JwtService jwtService;

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, @RequestParam LoginType loginType) {
        try {
            if (loginType == LoginType.BASIC) {
                // 자사 로그인일 때의 처리
                logoutService.logoutUser(request, response, loginType);
            } else {
                // 소셜 로그인일 때의 처리: 클라이언트를 소셜 플랫폼의 로그아웃 엔드포인트로 리다이렉트
                jwtService.clearClientTokenData(response, loginType);
                log.info("소셜 로그아웃 URL로 리다이렉트: {}", loginType);
            }
            log.info("로그아웃 요청 처리 완료");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("로그아웃 요청 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그아웃 실패: 서버 오류");
        }
    }



}

