package com.team_damda.domain.dto;


import com.team_damda.domain.enums.LoginType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPhoneUpdateRequest {
    private String phone;
    private LoginType loginType; // 추가된 필드
    private String snsId; // 추가된 필드
}
