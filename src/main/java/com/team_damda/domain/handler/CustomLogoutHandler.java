package com.team_damda.domain.handler;

import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler, LogoutSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // 토큰 추출
        Optional<String> refreshTokenOptional = jwtService.extractRefreshToken(request);
        refreshTokenOptional.ifPresent(refreshToken -> {
            // 토큰 유효성 검사
            if (jwtService.isTokenValid(refreshToken)) {
                // 리프레시 토큰이 유효하면, DB에서 해당 회원 정보를 찾아 리프레시 토큰 삭제
                memberRepository.getByRefreshToken(refreshToken).ifPresent(member -> {
                    member.clearRefreshToken();
                    memberRepository.save(member);
                    log.info("로그아웃 처리: 사용자 {}의 리프레시 토큰이 삭제되었습니다.", member.getUserEmail());
                });
            }
        });

        // 로그아웃 성공 처리 후 응답 초기화
        try {
            this.onLogoutSuccess(request, response, authentication);
        } catch (IOException e) {
            throw new RuntimeException("로그아웃 성공 응답 실패", e);
        }
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // 로그아웃 성공 응답 설정
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.getWriter().write("{\"message\":\"로그아웃 성공\"}");
        log.info("사용자 {} 로그아웃 완료", authentication != null ? authentication.getName() : "Anonymous");
    }
}
