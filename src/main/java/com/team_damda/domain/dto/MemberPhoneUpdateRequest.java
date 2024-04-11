package com.team_damda.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPhoneUpdateRequest {
    private Long Id;
    private String phone;
}
