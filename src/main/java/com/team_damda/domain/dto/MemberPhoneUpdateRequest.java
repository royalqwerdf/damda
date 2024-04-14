package com.team_damda.domain.dto;


import com.team_damda.domain.enums.LoginType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPhoneUpdateRequest {
    private String phone;
    private String userEmail;
}
