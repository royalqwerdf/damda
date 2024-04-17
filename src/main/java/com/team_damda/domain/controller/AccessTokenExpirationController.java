package com.team_damda.domain.controller;

import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AccessTokenExpirationController {

    private final JwtService jwtService;

//    @PostMapping("/checkAccess_tokenExpiration")
//    public ResponseEntity<?> checkAccessTokenExpiration(@RequestBody Map<String, String> requestBody) {
//        try {
//            String accessToken = requestBody.get("accessToken");
//            if (accessToken == null) {
//                return ResponseEntity.badRequest().body("액세스 토큰이 요청에 포함되어 있지 않습니다.");
//            }
//
//            // AccessToken의 만료 여부 확인 및 자동 로그아웃 처리
//
//            jwtService.checkAccessTokenExpirationAndLogout(accessToken);
//
//            // AccessToken이 만료되었는지 여부에 따라 응답을 반환
//            return ResponseEntity.ok().body("AccessToken이 유효합니다.");
//        } catch (JwtException e) {
//            // AccessToken이 만료된 경우
//            return ResponseEntity.ok().body("AccessToken이 만료되었습니다.");
//        } catch (Exception e) {
//            // 서버 오류 발생 시
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생: " + e.getMessage());
//        }
//    }

    @PostMapping("/checkAccess_tokenExpiration")
    public ResponseEntity<?> checkAccessTokenExpiration(@RequestBody Map<String, String> requestBody, HttpServletResponse response, LoginType loginType) {
        try {
            String accessToken = requestBody.get("accessToken");
            if (accessToken == null) {
                return ResponseEntity.badRequest().body("액세스 토큰이 요청에 포함되어 있지 않습니다.");
            }

            // AccessToken의 만료 여부 확인 및 자동 로그아웃 처리
            jwtService.checkAccessTokenExpirationAndLogout(accessToken, loginType ,response);

            // AccessToken이 만료되었는지 여부에 따라 응답을 반환
            return ResponseEntity.ok().body("AccessToken이 유효합니다.");
        } catch (JwtException e) {
            // AccessToken이 만료된 경우
            return ResponseEntity.ok().body("AccessToken이 만료되었습니다.");
        } catch (Exception e) {
            // 서버 오류 발생 시
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생: " + e.getMessage());
        }
    }

}

