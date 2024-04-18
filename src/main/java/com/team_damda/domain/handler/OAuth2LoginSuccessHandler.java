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

        // 로그 정보 추가
        log.info("로그인에 성공하였습니다. 아이디 : {}", member.getId());
        log.info("로그인에 성공하였습니다. 권한타입 : {}", member.getRole());
        log.info("로그인에 성공하였습니다. 이메일 : {}", oAuth2User.getUserEmail());
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("로그인에 성공하였습니다. RefreshToken : {}", refreshToken);
        log.info("발급된 AccessToken 만료 기간 : {}", jwtService.getAccessTokenExpirationPeriod());


        // 사용자의 추가 정보가 필요한 경우(예: 전화번호가 없는 경우)
        if (member.getPhone() == null || member.getPhone().isEmpty()) {
            String redirectUrl = "http://localhost:3000/Oauth2Signup?accessToken=" + URLEncoder.encode(accessToken, "UTF-8");
            response.sendRedirect(redirectUrl);
        } else {
            // 기존 회원은 홈페이지로 리다이렉션
            String redirectUrl = "http://localhost:3000/?accessToken=" + URLEncoder.encode(accessToken, "UTF-8");
            response.sendRedirect(redirectUrl);
        }

    }


}
