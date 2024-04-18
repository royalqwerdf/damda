package com.team_damda.domain.service;

import com.team_damda.domain.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {
    private final JwtService jwtService;
    private final LoginService userDetailsService; // 변경된 부분: UserDetailsServiceImpl -> LoginService



    public String createToken(Authentication authentication) {
        Member member = (Member) authentication.getPrincipal();
        return jwtService.createAccessToken(member);
    }

    public String createRefreshToken(Authentication authentication) {
        return jwtService.createRefreshToken();
    }

    public String getUsernameFromToken(String token) {
        return jwtService.extractEmail(token).orElse(null);
    }

    public boolean validateToken(String token) {
        return jwtService.isTokenValid(token);
    }

    public Authentication getAuthentication(String token) {
        String username = getUsernameFromToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
