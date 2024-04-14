package com.team_damda.domain.controller;

import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.JwtService;
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

    public TokenController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/token")
    public ResponseEntity<?> provideInitialToken(@RequestParam String userEmail) {
        String accessToken = jwtService.createAccessToken(userEmail);
        String refreshToken = jwtService.createRefreshToken();
        return ResponseEntity.ok()
                .header("accessToken", accessToken)
                .header("refreshToken", refreshToken)
                .body("Initial tokens are issued.");
    }

    @GetMapping("/token/initial")
    public ResponseEntity<Map<String, String>> provideInitialToken(HttpServletRequest request, HttpServletResponse response) {
        String userEmail = (String) request.getSession().getAttribute("userEmail");
        if (userEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No user email found in session"));
        }

        String accessToken = jwtService.createAccessToken(userEmail);
        String refreshToken = jwtService.createRefreshToken();

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);

        Map<String, String> tokens = Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken
        );

        return ResponseEntity.ok(tokens);
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        Optional<String> refreshTokenOptional = jwtService.extractRefreshToken(request);
        if (refreshTokenOptional.isEmpty() || !jwtService.isTokenValid(refreshTokenOptional.get())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
        }

        String userEmail = jwtService.extractEmail(refreshTokenOptional.get()).orElse("");
        if (userEmail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User email not found");
        }

        String newAccessToken = jwtService.createAccessToken(userEmail);
        return ResponseEntity.ok()
                .header(jwtService.getAccessHeader(), "Bearer " + newAccessToken)
                .body("New access token issued.");
    }
}


