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
//
//        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//
//        // Member 엔티티를 조회하여 로그인 정보를 가져옵니다.
//        Member member = memberRepository.getByUserEmail(oAuth2User.getUserEmail())
//                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + oAuth2User.getUserEmail()));
//
//        // AccessToken과 RefreshToken 생성
//        String accessToken = jwtService.createAccessToken(member);
//        String refreshToken = jwtService.createRefreshToken();
//
//        // 쿠키에 토큰 설정
//        setTokenCookies(response, accessToken);
//
//        // 로그 정보 추가
//        log.info("로그인에 성공하였습니다. 아이디 : {}", member.getId());
//        log.info("로그인에 성공하였습니다. 이메일 : {}", oAuth2User.getUserEmail());
//        log.info("로그인에 성공하였습니다. 로그인타입 : {}", oAuth2User.getLoginType());
//        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
//        log.info("로그인에 성공하였습니다. RefreshToken : {}", refreshToken);
//
//        // 사용자 역할에 따라 리다이렉션 경로 설정
//        response.sendRedirect("http://localhost:3000/Oauth2Signup");
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        log.info("OAuth2 Login 성공!");
//
//        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//
//        // Member 엔티티를 조회하여 로그인 정보를 가져옵니다.
//        Member member = memberRepository.getByUserEmail(oAuth2User.getUserEmail())
//                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + oAuth2User.getUserEmail()));
//
//        // 사용자가 처음 가입한 경우 추가 정보를 받아야 합니다.
//        if (member.getPhone() == null) {
//            response.sendRedirect("http://localhost:3000/Oauth2Signup");
//        } else {
//            // AccessToken과 RefreshToken 생성
//            String accessToken = jwtService.createAccessToken(member);
//            String refreshToken = jwtService.createRefreshToken();
//
//            // 쿠키에 토큰 설정
//            setTokenCookies(response, accessToken);
//
//            // 로그 정보 추가
//            log.info("로그인에 성공하였습니다. 아이디 : {}", member.getId());
//            log.info("로그인에 성공하였습니다. 이메일 : {}", oAuth2User.getUserEmail());
//            log.info("로그인에 성공하였습니다. 로그인타입 : {}", oAuth2User.getLoginType());
//            log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
//            log.info("로그인에 성공하였습니다. RefreshToken : {}", refreshToken);
//
//            // 기존 가입자는 홈페이지로 리다이렉션
//            response.sendRedirect("http://localhost:3000/");
//        }
//    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // Member 엔티티를 조회하여 로그인 정보를 가져옵니다.
        Member member = memberRepository.getByUserEmail(oAuth2User.getUserEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + oAuth2User.getUserEmail()));

        // 사용자가 처음 가입한 경우 추가 정보를 받아야 합니다.
        if (member.getPhone() == null) {
            // AccessToken과 RefreshToken 생성
            String accessToken = jwtService.createAccessToken(member);
            String refreshToken = jwtService.createRefreshToken();

            // 쿠키에 토큰 설정
            setTokenCookies(response, accessToken);

            // 로그 정보 추가
            log.info("로그인에 성공하였습니다. 아이디 : {}", member.getId());
            log.info("로그인에 성공하였습니다. 이메일 : {}", oAuth2User.getUserEmail());
            log.info("로그인에 성공하였습니다. 로그인타입 : {}", oAuth2User.getLoginType());
            log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
            log.info("로그인에 성공하였습니다. RefreshToken : {}", refreshToken);

            // 리다이렉션 전에도 쿠키 설정
            setTokenCookies(response, accessToken);

            // 새로운 가입자는 추가 정보를 받는 페이지로 리다이렉션
            response.sendRedirect("http://localhost:3000/Oauth2Signup");
        } else {
            // AccessToken과 RefreshToken 생성
            String accessToken = jwtService.createAccessToken(member);
            String refreshToken = jwtService.createRefreshToken();

            // 쿠키에 토큰 설정
            setTokenCookies(response, accessToken);

            // 로그 정보 추가
            log.info("로그인에 성공하였습니다. 아이디 : {}", member.getId());
            log.info("로그인에 성공하였습니다. 이메일 : {}", oAuth2User.getUserEmail());
            log.info("로그인에 성공하였습니다. 로그인타입 : {}", oAuth2User.getLoginType());
            log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
            log.info("로그인에 성공하였습니다. RefreshToken : {}", refreshToken);

            // 기존 가입자는 홈페이지로 리다이렉션
            response.sendRedirect("http://localhost:3000/");
        }
    }


    private void setTokenCookies(HttpServletResponse response, String accessToken) {
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true); // HTTPS 환경에서만 쿠키 전송
        accessTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);

    }
}
