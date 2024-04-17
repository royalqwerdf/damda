package com.team_damda.domain.service;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.repository.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;


@Slf4j
@Service
@RequiredArgsConstructor
public class LogoutService {

    private final JwtService jwtService;

    public void logoutUser(HttpServletRequest request, HttpServletResponse response, LoginType loginType) {
        // 클라이언트에서 액세스 토큰과 관련된 데이터(쿠키 또는 로컬 스토리지) 삭제
        jwtService.clearClientTokenData(response, loginType);

        // 리프레시 토큰 삭제
        String refreshToken = jwtService.extractRefreshToken(request)
                .orElseThrow(() -> new IllegalArgumentException("새로 고친 토큰을 찾을 수 없습니다."));
        jwtService.clearRefreshToken(refreshToken);

        log.info("로그아웃 처리: 클라이언트 토큰 데이터가 삭제되었습니다.");
    }
}