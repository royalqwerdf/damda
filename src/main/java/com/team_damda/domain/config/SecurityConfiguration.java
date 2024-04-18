//package com.team_damda.domain.config;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.team_damda.domain.enums.LoginType;
//import com.team_damda.domain.enums.Role;
//import com.team_damda.domain.filter.CustomJsonUsernamePasswordAuthenticationFilter;
//import com.team_damda.domain.filter.JwtAuthenticationFilter;
//import com.team_damda.domain.filter.JwtAuthenticationProcessingFilter;
//import com.team_damda.domain.handler.*;
//import com.team_damda.domain.repository.MemberRepository;
//import com.team_damda.domain.service.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.ProviderManager;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.web.authentication.logout.LogoutFilter;
//import org.springframework.security.authentication.AuthenticationManager;
//
//import java.util.Arrays;
//
//
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfiguration {
//
//    private final LoginService loginService;
//    private final JwtService jwtService;
//    private final MemberRepository memberRepository;
//    private final ObjectMapper objectMapper;
//    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
//    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
//    private final CustomOAuth2UserService customOAuth2UserService;
//    private final JwtTokenProvider jwtTokenProvider;
////    private final UserDetailsServiceImpl userDetailsService;
//
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//
//        http
//                .formLogin(f->f.disable()) // FormLogin 사용 X
//                .httpBasic(h -> h.disable()) //HTTP 기본 인증을 비활성화
//                .csrf(AbstractHttpConfigurer::disable)//CSRF 보호 기능 비활성화
//                .sessionManagement(s ->
//                        s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                )
//                .authorizeHttpRequests(auth ->
//                        auth
//                                .requestMatchers("/", "/login","/home","/category","/search","/class-open", "/Oauth2Signup" ,"/memberSaved").permitAll()
//                                .requestMatchers("/admin-home/**").hasRole("ADMIN")
//                                .requestMatchers("/User-Home/**").hasAnyRole("ADMIN", "USER")
//                                .anyRequest().authenticated()
//
//                )
//                .addFilterBefore(new JwtAuthenticationFilter(authenticationManager(), jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
//
//                .logout(logout -> logout
//                        .logoutUrl("/logout")
//                        .addLogoutHandler(customLogoutHandler())
//                        .logoutSuccessHandler(customLogoutSuccessHandler())
//                )
//
//
//                //== 소셜 로그인 설정 ==//
//                .oauth2Login((oauth2) -> oauth2
//                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
//                                .userService(customOAuth2UserService))// customUserService 설정
//                        .failureHandler(oAuth2LoginFailureHandler)// 소셜 로그인 실패 시 핸들러 설정
//                        .successHandler(oAuth2LoginSuccessHandler)
//                );// 동의하고 계속하기를 눌렀을 때 Handler 설정
//        http.addFilterBefore(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
//        http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);
//
//
//        return http.build();
//
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//    }
//
//
////    @Bean
////    public AuthenticationManager authenticationManager() {
////        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
////        provider.setUserDetailsService(userDetailsService); // UserDetailsServiceImpl 설정
////        return new ProviderManager(Arrays.asList(provider));
////    }
//
//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
//        return new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider);
//    }
//
//
//    /**
//     * AuthenticationManager 설정 후 등록
//     * PasswordEncoder를 사용하는 AuthenticationProvider 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
//     * FormLogin(기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
//     * UserDetailsService는 커스텀 LoginService로 등록
//     * 또한, FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용(return ProviderManager)
//     *
//     */
//    @Bean
//    public AuthenticationManager authenticationManager() {
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setPasswordEncoder(passwordEncoder());
//        provider.setUserDetailsService(loginService);
//        return new ProviderManager(provider);
//    }
//
//    /**
//     * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
//     */
//    @Bean
//    public LoginSuccessHandler loginSuccessHandler() {
//        return new LoginSuccessHandler(jwtService, memberRepository);
//    }
//
//    /**
//     * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
//     */
//    @Bean
//    public LoginFailureHandler loginFailureHandler() {
//        return new LoginFailureHandler();
//    }
//
//    /**
//     * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
//     * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록
//     * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
//     * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
//     */
//    @Bean
//    public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
//        CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordLoginFilter
//                = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
//        customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
//        customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
//        customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
//        return customJsonUsernamePasswordLoginFilter;
//    }
//
//    @Bean
//    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
//        JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService, memberRepository);
//        return jwtAuthenticationFilter;
//    }
//
//    @Bean
//    public CustomLogoutHandler customLogoutHandler() {
//        // LoginType을 필요로 하는 CustomLogoutHandler를 생성할 때 loginType을 지정합니다.
//        return new CustomLogoutHandler(); // 여기서 LoginType을 설정해야 합니다.
//    }
//
//    // CustomLogoutSuccessHandler 빈 등록
//    @Bean
//    public CustomLogoutSuccessHandler customLogoutSuccessHandler() {
//        return new CustomLogoutSuccessHandler();
//    }
//}


package com.team_damda.domain.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.team_damda.domain.filter.JwtAuthenticationFilter;
import com.team_damda.domain.filter.JwtAuthenticationProcessingFilter;
import com.team_damda.domain.handler.*;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.CustomOAuth2UserService;
import com.team_damda.domain.service.JwtService;
import com.team_damda.domain.service.JwtTokenProvider;
import com.team_damda.domain.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.authentication.AuthenticationManager;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final LoginService loginService;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {


        http
                .formLogin(f->f.disable()) // FormLogin 사용 X
                .httpBasic(h -> h.disable()) //HTTP 기본 인증을 비활성화
                .csrf(AbstractHttpConfigurer::disable)//CSRF 보호 기능 비활성화
                .sessionManagement(s ->
                        s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/", "api/signup", "/login","/home","/category","/search","/class-open", "/Oauth2Signup" ,"/memberSaved").permitAll()
                                .requestMatchers("/admin-home/**").hasRole("ADMIN")
                                .requestMatchers("/user-home/**").hasAnyRole("USER", "ADMIN")
                                .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .addLogoutHandler(customLogoutHandler())
                        .logoutSuccessHandler(customLogoutSuccessHandler())
                )

                //== 소셜 로그인 설정 ==//
                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
                                .userService(customOAuth2UserService))// customUserService 설정
                        .failureHandler(oAuth2LoginFailureHandler)// 소셜 로그인 실패 시 핸들러 설정
                        .successHandler(oAuth2LoginSuccessHandler)
                );// 동의하고 계속하기를 눌렀을 때 Handler 설정
        http.addFilterBefore(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
        http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);


        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception {
        return new JwtAuthenticationFilter(jwtTokenProvider, jwtService, authenticationManager(), loginSuccessHandler());
    }


    /**
     * AuthenticationManager 설정 후 등록
     * PasswordEncoder를 사용하는 AuthenticationProvider 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
     * FormLogin(기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
     * UserDetailsService는 커스텀 LoginService로 등록
     * 또한, FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용(return ProviderManager)
     *
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(loginService);
        return new ProviderManager(provider);
    }

    /**
     * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
     */
    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService, memberRepository);
    }

    /**
     * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
     */
    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }

    /**
     * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
     * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록
     * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
     * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
     */
    @Bean
    public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
        CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordLoginFilter
                = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
        customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
        customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
        customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
        return customJsonUsernamePasswordLoginFilter;
    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService, memberRepository);
        return jwtAuthenticationFilter;
    }

    @Bean
    public CustomLogoutHandler customLogoutHandler() {
        // LoginType을 필요로 하는 CustomLogoutHandler를 생성할 때 loginType을 지정합니다.
        return new CustomLogoutHandler(); // 여기서 LoginType을 설정해야 합니다.
    }

    // CustomLogoutSuccessHandler 빈 등록
    @Bean
    public CustomLogoutSuccessHandler customLogoutSuccessHandler() {
        return new CustomLogoutSuccessHandler();
    }
}
