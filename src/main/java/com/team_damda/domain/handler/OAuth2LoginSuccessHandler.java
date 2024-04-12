package com.team_damda.domain.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.oauth2.CustomOAuth2User;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        log.info("OAuth2 Login 성공!");
//        try {
//            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//
//            if (oAuth2User.getRole() == Role.USER) {
//                String accessToken = jwtService.createAccessToken(oAuth2User.getUserEmail());
//                response.addHeader(jwtService.getAccessHeader(), "Bearer" + accessToken);
//                response.sendRedirect("http://localhost:3000/memberSaved"); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
//                jwtService.sendAccessAndRefreshToken(response, accessToken, null);
////                    Member getMember = memberRepository.getByUserEmail(oAuth2User.getUserEmail())
////                            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
////                        getMember.authorizeUser();
//            } else {
//                loginSuccess(response, oAuth2User);
//            }
//        } catch (Exception e) {
//            throw e;
//        }
//    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // AccessToken 생성
        String accessToken = jwtService.createAccessToken(oAuth2User.getUserEmail());
        // RefreshToken 생성
        String refreshToken = jwtService.createRefreshToken();

        // 헤더에 AccessToken과 RefreshToken 추가
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);

        // 로그 정보 추가
        log.info("로그인에 성공하였습니다. 이메일 : {}", oAuth2User.getUserEmail());
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("로그인에 성공하였습니다. RefreshToken : {}", refreshToken);
        log.info("발급된 AccessToken 만료 기간 : {}", jwtService.getAccessTokenExpirationPeriod());



        // 사용자 역할에 따라 리다이렉션 경로 설정
        if (oAuth2User.getRole() == Role.USER) {
            // 이미 가입된 사용자는 홈 페이지로 리다이렉트
            response.sendRedirect("http://localhost:3000/");
        } else {
            // 새 사용자인 경우 추가 정보 입력 페이지로 리다이렉트
            response.sendRedirect("http://localhost:3000/memberSaved");
        }
    }


    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getUserEmail());
        String refreshToken = jwtService.createRefreshToken();
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getUserEmail(), refreshToken);
    }
}
