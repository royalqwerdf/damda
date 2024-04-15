package com.team_damda.domain.filter;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.JwtService;
import com.team_damda.domain.util.PasswordUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

/**
 * Jwt 인증 필터
 * "/login" 이외의 URI 요청이 왔을 때 처리하는 필터
 *
 * 기본적으로 사용자는 요청 헤더에 AccessToken만 담아서 요청
 * AccessToken 만료 시에만 RefreshToken을 요청 헤더에 AccessToken과 함께 요청
 *
 * 1. RefreshToken이 없고, AccessToken이 유효한 경우 -> 인증 성공 처리, RefreshToken을 재발급하지는 않는다.
 * 2. RefreshToken이 없고, AccessToken이 없거나 유효하지 않은 경우 -> 인증 실패 처리, 403 ERROR
 * 3. RefreshToken이 있는 경우 -> DB의 RefreshToken과 비교하여 일치하면 AccessToken 재발급, RefreshToken 재발급(RTR 방식)
 *                              인증 성공 처리는 하지 않고 실패 처리
 *
 */


//@RequiredArgsConstructor
//@Slf4j
//public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {
//
//    private static final String NO_CHECK_URL = "login";
//
//    private final JwtService jwtService;
//    private final MemberRepository memberRepository;
//
//    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        if (request.getRequestURI().equals(NO_CHECK_URL)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String refreshToken = jwtService.extractRefreshToken(request)
//                .filter(jwtService::isTokenValid)
//                .orElse(null);
//
//        if (refreshToken != null) {
//            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
//            return;
//        }
//
//        if (refreshToken == null) {
//            checkAccessTokenAndAuthentication(request, response, filterChain);
//        }
//    }
//
//    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
//        memberRepository.getByRefreshToken(refreshToken)
//                .ifPresent(member -> {
//                    String reIssuedRefreshToken = reIssueRefreshToken(member);
//                    jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(member.getUserEmail()), reIssuedRefreshToken);
//                });
//    }
//
//    public String reIssueRefreshToken(Member member) {
//        String reIssueRefreshToken = jwtService.createRefreshToken();
//        member.updateRefreshToken(reIssueRefreshToken);
//        memberRepository.saveAndFlush(member);
//        return reIssueRefreshToken;
//    }
//
//    public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response,
//                                                  FilterChain filterChain) throws ServletException, IOException {
//        log.info("checkAccessTokenAndAuthentication() 호출");
//        jwtService.extractAccessToken(request)
//                .filter(jwtService::isTokenValid)
//                .ifPresent(accessToken -> jwtService.extractEmail(accessToken)
//                        .ifPresent(email -> memberRepository.getByUserEmail(email)
//                                .ifPresent(this::saveAuthentication)));
//
//        filterChain.doFilter(request, response);
//    }
//    public void saveAuthentication(Member myUser) {
//        String password = myUser.getPassword();
//        if (password == null) { // 소셜 로그인 유저의 비밀번호 임의로 설정 하여 소셜 로그인 유저도 인증 되도록 설정
//            password = PasswordUtil.generateRandomPassword();
//        }
//        UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
//                .username(myUser.getUserEmail())
//                .password(password)
//                .roles(myUser.getRole().name())
//                .build();
//
//        Authentication authentication =
//                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
//                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//    }
//
//
//}

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL = "/login";
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().contains(NO_CHECK_URL)) {
            filterChain.doFilter(request, response);
            return;
        }

        Optional<String> refreshTokenOptional = Optional.empty();
        Optional<String> accessTokenOptional = Optional.empty();

        // 로그인 타입에 따른 토큰 추출 로직 구분 (예시: 쿠키 vs. 헤더)
        if ("social".equals(request.getParameter("loginType"))) {
            refreshTokenOptional = extractTokenFromCookie(request, "refreshToken");
            accessTokenOptional = extractTokenFromCookie(request, "accessToken");
        } else {
            refreshTokenOptional = jwtService.extractRefreshToken(request);
            accessTokenOptional = jwtService.extractAccessToken(request);
        }

        if (refreshTokenOptional.isPresent() && jwtService.isTokenValid(refreshTokenOptional.get())) {
            checkRefreshTokenAndReIssueAccessToken(response, refreshTokenOptional.get());
        } else if (accessTokenOptional.isPresent() && jwtService.isTokenValid(accessTokenOptional.get())) {
            checkAccessTokenAndAuthentication(request, response, filterChain, accessTokenOptional.get());
        } else {
            filterChain.doFilter(request, response);
        }
    }

    private Optional<String> extractTokenFromCookie(HttpServletRequest request, String tokenName) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals(tokenName)) {
                    return Optional.of(cookie.getValue());
                }
            }
        }
        return Optional.empty();
    }

    private void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
        memberRepository.getByRefreshToken(refreshToken)
                .ifPresent(member -> {
                    String reIssuedRefreshToken = reIssueRefreshToken(member);
                    jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(member.getUserEmail()), reIssuedRefreshToken);
                });
    }

    private String reIssueRefreshToken(Member member) {
        String reIssuedRefreshToken = jwtService.createRefreshToken();
        member.updateRefreshToken(reIssuedRefreshToken);
        memberRepository.saveAndFlush(member);
        return reIssuedRefreshToken;
    }

    private void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, String accessToken) throws ServletException, IOException {
        jwtService.extractEmail(accessToken)
                .flatMap(email -> memberRepository.getByUserEmail(email))
                .ifPresentOrElse(
                        member -> {
                            saveAuthentication(member);
                            try {
                                filterChain.doFilter(request, response);
                            } catch (IOException | ServletException e) {
                                throw new RuntimeException(e);
                            }
                        },
                        () -> {
                            log.error("Authentication failed for token: {}", accessToken);
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        }
                );
    }

    private void saveAuthentication(Member myUser) {
        String password = myUser.getPassword();
        if (password == null) {
            password = "password123!"; // 임의의 비밀번호 설정
        }
        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(myUser.getUserEmail())
                .password(password)
                .roles(myUser.getRole().name())
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
