package com.team_damda.domain.controller;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.JwtService;
import com.team_damda.domain.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
public class TokenController {

    private final JwtService jwtService;
    private final MemberService memberService;

    public TokenController(JwtService jwtService, MemberService memberService) {
        this.jwtService = jwtService;
        this.memberService=memberService;
    }

    @PostMapping("/token")
    public ResponseEntity<?> provideInitialToken(@RequestParam Long memberId) {
        Member member = memberService.findById(memberId);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found with ID: " + memberId);
        }

        String accessToken = jwtService.createAccessToken(member);
        String refreshToken = jwtService.createRefreshToken();
        return ResponseEntity.ok()
                .header("accessToken", accessToken)
                .header("refreshToken", refreshToken)
                .body("Initial tokens are issued.");
    }

    @GetMapping("/token/initial")
    public ResponseEntity<Map<String, String>> provideInitialToken(@RequestParam Long memberId, HttpServletResponse response, LoginType loginType) {
        Member member = memberService.findById(memberId);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Member not found with ID: " + memberId));
        }

        String accessToken = jwtService.createAccessToken(member);
        String refreshToken = jwtService.createRefreshToken();

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);

        Map<String, String> tokens = Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken
        );

        return ResponseEntity.ok(tokens);
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, @RequestParam Long memberId, LoginType loginType) {
        Optional<String> refreshTokenOptional = jwtService.extractRefreshToken(request);
        if (refreshTokenOptional.isEmpty() || !jwtService.isTokenValid(refreshTokenOptional.get())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
        }

        Member member = memberService.findById(memberId);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found with ID: " + memberId);
        }

        String newAccessToken = jwtService.createAccessToken(member);
        return ResponseEntity.ok()
                .header(jwtService.getAccessHeader(), "Bearer " + newAccessToken)
                .body("New access token issued.");
    }

}


