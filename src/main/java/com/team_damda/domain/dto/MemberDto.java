package com.team_damda.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    long id;
    String userEmail;
    String name;
    Date createdAt;
    String password;
    String phone;
    String loginType;
}
