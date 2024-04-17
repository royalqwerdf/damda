package com.team_damda.domain.handler;

import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import com.team_damda.domain.entity.Member;

/**
 * JSON 로그인 성공 시 핸들러 구현
 */
@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String email = extractUsername(authentication);

        // Member 엔티티를 조회하여 로그인 유형 정보를 가져옵니다.
        Member member = memberRepository.getByUserEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // 로그인 유형을 기반으로 AccessToken을 생성합니다.
        String accessToken = jwtService.createAccessToken(member);
        String refreshToken = jwtService.createRefreshToken();

        // 토큰을 응답 헤더에 추가합니다.
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);

        // 리프레시 토큰을 업데이트합니다.
        member.updateRefreshToken(refreshToken);
        memberRepository.saveAndFlush(member);

        log.info("로그인에 성공하였습니다. 아이디 : {}", member.getId());
        log.info("로그인에 성공하였습니다. 이메일 : {}", email);
        log.info("로그인에 성공하였습니다. 로그인타입 : {}", member.getLoginType());
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
