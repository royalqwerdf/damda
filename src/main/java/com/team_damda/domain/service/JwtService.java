package com.team_damda.domain.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.repository.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    /**
     * JWT의 subject와 Claim으로 email 사용 > 클레임 name을 userEmail로 설정
     * JWT의 헤더에 들어오는 값  'Authorization(Key) = Bearer {토큰} (Value)' 형식
     */
    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String EMAIL_CLAIM = "userEmail";
    private static final String BEARER = "Bearer ";

    private final MemberRepository memberRepository;

    /**
     * AccessToken 생성 메소드
     */
    public String createAccessToken(Member member) {
        Date now = new Date();
        return JWT.create()
                //JWT 토큰 생성 빌더 반환
                .withSubject(ACCESS_TOKEN_SUBJECT)
                // JWT의 Subject 지정 > AccessToken이므로 AccessToken
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod))
                // 클레임으로 email 하나만 사용
                .withClaim(EMAIL_CLAIM, member.getUserEmail())
                // 로그인 유형 추가
                .withClaim("loginType", member.getLoginType().name())
                // member 엔티티 id 값추가
                .withClaim("memberId", member.getId())
                // HMAC512 알고리즘 사용, application.properties에 지정한 secret 키로 암호화
                .sign(Algorithm.HMAC512(secretKey));

    }

    /**
     * RefreshToken 생성
     */
    public String createRefreshToken() {
        Date now = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    /**
     * AccessToken 헤더에 보내기
     */
    public void sendAccessToken(HttpServletResponse response, String accessToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        response.setHeader(accessHeader, accessToken);
        log.info("재발급된 Access Token : {}", accessToken);
    }

    /**
     * AccessToken + RefreshToken 헤더에 보내기
     */
    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader(accessHeader, accessToken);
        response.setHeader(refreshHeader, refreshToken);
        log.info("Access Token, Refresh Token 헤더 설정 완료");
    }

    /**
     * 헤더에서 RefreshToken 추출
     * 토큰 형식 : Bearer ---에서 Bearer를 제외하고 순수 토큰만 갖고오기
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
     * 헤더에서 AccessToken 추출
     * 토큰 형식 : Bearer ---에서 Bearer를 제외하고 순수 토큰만 갖고오기
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
     * AccessToken에서 Email 추출
     */
    public Optional<String> extractEmail(String accessToken) {
        try {
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken)
                    .getClaim(EMAIL_CLAIM)
                    .asString());
        } catch (Exception e) {
            log.error("액세스 토큰이 유효하지 않습니다.");
            return Optional.empty();
        }
    }

    /**
     * AccessToken 헤더 설정
     */
    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    /**
     * RefreshToken 헤더 설정
     */
    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    /**
     * RefreshToken DB 저장(업데이트)
     */
    public void updateRefreshToken(String email, String refreshToken) {
        memberRepository.getByUserEmail(email)
                .ifPresentOrElse(
                        member -> member.updateRefreshToken(refreshToken),
                        () -> new Exception("일치하는 회원이 없습니다.")
                );
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            return false;
        }
    }

    /**
     * AccessToken과 관련된 클라이언트 토큰 데이터를 삭제합니다.
     *
     * @param response    HttpServletResponse 객체
     * @param loginType   로그인 타입
     */
    public void clearClientTokenData(HttpServletResponse response, LoginType loginType) {
        switch (loginType) {
            case BASIC:
                clearLocalStorage(response);
                break;
            case KAKAO:
                clearCookie(response);
                break;
            case NAVER:
                clearCookie(response);
                break;
            case GOOGLE:
                clearCookie(response);
                break;
            default:
                log.error("Unsupported login type: {}", loginType);
                break;
        }
    }

    private void clearLocalStorage(HttpServletResponse response) {

    }

    private void clearCookie(HttpServletResponse response) {

        Cookie cookie = new Cookie("accessToken", null); // 동일한 이름의 빈 값을 가진 쿠키 생성
        cookie.setMaxAge(0); // 쿠키의 만료 기간을 0으로 설정하여 즉시 만료되도록 함
        cookie.setPath("/"); // 쿠키의 경로 설정 (쿠키가 유효한 경로 지정)
        response.addCookie(cookie); // 응답 헤더에 쿠키 추가
    }

}
