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

import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.List;
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
        // 만료 시간 설정
        Date expiration = new Date(now.getTime() + accessTokenExpirationPeriod);
        //엔티티의 accessTokenExpiration 필드에 만료시간 저장
        member.setAccessTokenExpiration(expiration.toInstant());
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
     * AccessToken 만료 여부 확인 및 자동 로그아웃 처리
     */
    public void checkAccessTokenExpirationAndLogout(String accessToken, LoginType loginType, HttpServletResponse response) {
        try {
            // AccessToken의 만료 시간 확인
            Date expirationDate = JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken)
                    .getExpiresAt();

            if (expirationDate != null && expirationDate.before(new Date())) {
                // AccessToken 만료 시간이 지났을 경우 자동 로그아웃 처리
                log.info("AccessToken이 만료되어 자동 로그아웃 처리를 진행합니다.");
                clearRefreshToken(accessToken);
                clearClientTokenData(response, loginType); // 로그인 타입에 따라 클라이언트 토큰 데이터 삭제
            }
        } catch (Exception e) {
            log.error("AccessToken 유효성 검사 중 오류 발생: {}", e.getMessage());
        }
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
     * 데이테 베이스에 리스페시 토큰 삭제 요청
     * 새로운 토큰이 자동 생성됨
     * @param refreshToken
     */
    public void clearRefreshToken(String refreshToken) {
        log.info("리프레시 토큰 삭제 메서드 호출됨");
        memberRepository.getByRefreshToken(refreshToken).ifPresent(member -> {
            member.clearRefreshToken();
            memberRepository.save(member);
            log.info("리프레시 토큰이 삭제되었습니다.");
        });
    }


    public void clearClientTokenData(HttpServletResponse response, LoginType loginType) {
        if (loginType == LoginType.BASIC) {
            // 자사 로그인일 때의 처리: 로컬 스토리지에서 토큰 삭제
            // 여기에 해당 로직을 구현
            // localStorage.removeItem('accessToken'); // 자사 로그인일 경우 클라이언트 측에서 구현해야 합니다.
        } else {
            // 소셜 로그인일 때의 처리: 소셜 플랫폼의 로그아웃 엔드포인트 호출하여 토큰 무효화
            String socialLogoutUrl = getSocialLogoutUrl(loginType);
            // localStorage.removeItem('accessToken'); // 소셜 로그인일 경우 클라이언트 측에서 구현해야 합니다.

            // 소셜 플랫폼의 로그아웃 URL로 리다이렉트
            try {
                response.sendRedirect(socialLogoutUrl);
            } catch (IOException e) {
                log.error("소셜 로그아웃 중 오류 발생: {}", e.getMessage());
            }
        }
    }


    /**
     * 소셜 로그인 타입에 따라 해당 소셜 플랫폼의 로그아웃 URL을 반환
     */
    private String getSocialLogoutUrl(LoginType loginType) {
        switch (loginType) {
            case KAKAO:
                return "https://kauth.kakao.com/oauth/logout";
            case NAVER:
                return "https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&access_token={ACCESS_TOKEN}&service_provider=NAVER";
            case GOOGLE:
                return "https://www.google.com/accounts/Logout";
            default:
                throw new IllegalArgumentException("Unsupported login type: " + loginType);
        }
    }




    /**
     * 만료된 토큰의 만료 시간을 데이터베이스에서 삭제합니다.
     * @param accessToken 삭제할 액세스 토큰
     */
    public void clearAccessTokenExpiration(String accessToken) {
        try {
            // 만료된 토큰의 만료 시간을 데이터베이스에서 삭제합니다.
            memberRepository.clearExpiredAccessTokens(Instant.now());
        } catch (Exception e) {
            log.error("Failed to clear access token expiration from database: {}", e.getMessage());
        }
    }


}
