package com.team_damda.domain.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MemberSignupDto {
    private String userEmail;
    private String password;
    private String name;
    private String phone;
}
