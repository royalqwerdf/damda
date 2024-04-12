package com.team_damda.domain.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins("http://localhost:3000") // 모든 오리진 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // 모든 HTTP 메소드 허용
                .allowedHeaders("*") // 모든 헤더 허용
                .exposedHeaders("authorization", "Authorization-Refresh") // 클라이언트가 읽을 수 있도록 특정 헤더 노출
                .allowCredentials(true) // 크레덴셜(쿠키 등) 허용
                .maxAge(3600); // 사전 요청(preflight)의 결과를 1시간 동안 캐시
    }
}