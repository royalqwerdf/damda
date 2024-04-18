package com.team_damda.domain.filter;


import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;


@Slf4j
public class CustomLogoutFilter extends LogoutFilter {

    public CustomLogoutFilter(LogoutSuccessHandler logoutSuccessHandler, LogoutHandler... handlers) {
        super(logoutSuccessHandler, handlers);
    }

    // 필터의 기본 동작을 그대로 사용하면서, 추가적인 로그아웃 로직은 Handler에서 처리
}