package com.team_damda.domain.filter;

import com.team_damda.domain.service.JwtService;
import com.team_damda.domain.service.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.security.authentication.AuthenticationServiceException;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Optional;

@Component
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtService jwtService;
    private final AuthenticationSuccessHandler loginSuccessHandler;


    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, JwtService jwtService, AuthenticationManager authenticationManager, AuthenticationSuccessHandler loginSuccessHandler) {
        super();
        this.jwtTokenProvider = jwtTokenProvider;
        this.jwtService = jwtService;
        this.loginSuccessHandler = loginSuccessHandler;
        this.setAuthenticationManager(authenticationManager);
    }

//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//        // 토큰을 JWT 서비스를 이용하여 추출
//        Optional<String> token = jwtService.extractAccessToken(request);
//        if (token.isPresent() && jwtTokenProvider.validateToken(token.get())) {
//            Authentication authentication = jwtTokenProvider.getAuthentication(token.get());
//            return authentication;
//        } else {
//            throw new AuthenticationServiceException("Authentication failed: token invalid");
//        }
//    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        Optional<String> token = jwtService.extractAccessToken(request);
        if (token.isPresent() && jwtTokenProvider.validateToken(token.get())) {
            return jwtTokenProvider.getAuthentication(token.get());
        } else {
            throw new AuthenticationServiceException("Authentication failed: token invalid");
        }
    }

//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
//        SecurityContextHolder.getContext().setAuthentication(authResult);
//        chain.doFilter(request, response);
//    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(authResult);
        loginSuccessHandler.onAuthenticationSuccess(request, response, authResult);
        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        SecurityContextHolder.clearContext();
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed: " + failed.getMessage());
    }
}
