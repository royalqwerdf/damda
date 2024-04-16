package com.team_damda.domain.controller;

import com.team_damda.domain.enums.LoginType;
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



@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping
public class LogoutController {

    private final LogoutService logoutService;

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, @RequestParam LoginType loginType) {
        try {
            logoutService.logoutUser(request, response, loginType);
            log.info("로그아웃 요청 처리 완료");
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            log.error("로그아웃 요청 실패: 유효하지 않은 토큰", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그아웃 실패: 유효하지 않은 토큰");
        } catch (Exception e) {
            log.error("로그아웃 요청 실패", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그아웃 실패: 서버 오류");
        }
    }
}

