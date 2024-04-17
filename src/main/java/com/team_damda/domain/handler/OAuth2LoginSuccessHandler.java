package com.team_damda.domain.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.oauth2.CustomOAuth2User;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Member member = memberRepository.getByUserEmail(oAuth2User.getUserEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + oAuth2User.getUserEmail()));

        String accessToken = jwtService.createAccessToken(member);
        String refreshToken = jwtService.createRefreshToken();

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);

        // 사용자의 추가 정보가 필요한 경우(예: 전화번호가 없는 경우)
        if (member.getPhone() == null || member.getPhone().isEmpty()) {
            String redirectUrl = "http://localhost:3000/Oauth2Signup?accessToken=" + URLEncoder.encode(accessToken, "UTF-8");
            response.sendRedirect(redirectUrl);
        } else {
            // 기존 회원은 홈페이지로 리다이렉션
            response.sendRedirect("http://localhost:3000/");
        }
    }

}
