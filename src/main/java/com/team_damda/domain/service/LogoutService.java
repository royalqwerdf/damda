package com.team_damda.domain.service;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;


//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class LogoutService {
//
//    private final JwtService jwtService;
//    private final MemberRepository memberRepository;
//
//    public void logoutUser(HttpServletRequest request) {
//        String refreshToken = jwtService.extractRefreshToken(request)
//                .orElseThrow(() -> new IllegalArgumentException("새로 고친 토큰을 찾을 수 없습니다."));
//        Member member = memberRepository.getByRefreshToken(refreshToken)
//                .orElseThrow(() -> new IllegalArgumentException("유효하지 않는 토큰 입니다."));
//
//        switch (member.getLoginType()) {
//            case KAKAO :
//                // 카카오 플랫폼 로그아웃 처리
//                log.info("카카오 로그아웃 처리: {}", member.getUserEmail());
//                break;
//
//            case NAVER:
//                // 네이버 플랫폼 로그아웃 처리
//                log.info("네이버 로그아웃 처리: {}", member.getUserEmail());
//                break;
//
//            case GOOGLE:
//                // 구글 플랫폼 로그아웃 처리
//                log.info("구글 로그아웃 처리: {}", member.getUserEmail());
//                break;
//
//            case BASIC:
//                // 리프레시 토큰을 DB에서 제거
//                member.clearRefreshToken();
//                memberRepository.save(member);
//                log.info("자체 로그아웃 처리: {}", member.getUserEmail());
//                break;
//
//            default:
//                throw new IllegalStateException("지원하지 않는 소셜 로그인입니다.");
//        }
//
//
//    }
//
//}


@Slf4j
@RequiredArgsConstructor
@Service
public class LogoutService {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    public void logoutUser(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtService.extractRefreshToken(request)
                .orElseThrow(() -> new IllegalArgumentException("새로 고친 토큰을 찾을 수 없습니다."));

        Member member = memberRepository.getByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않는 토큰입니다."));

        // 클라이언트에서 액세스 토큰과 관련된 데이터(쿠키 또는 로컬 스토리지) 삭제
        clearClientTokenData(response);

        // 해당 사용자의 액세스 토큰 만료 시간 즉시 설정하여 액세스 토큰을 즉시 만료시킴
        member.setAccessTokenExpiration(Instant.now());
        memberRepository.save(member);

        log.info("로그아웃 처리: 사용자 {}의 액세스 토큰이 만료되었습니다.", member.getUserEmail());
    }

    public void clearClientTokenData(HttpServletResponse response) {

    }
}

