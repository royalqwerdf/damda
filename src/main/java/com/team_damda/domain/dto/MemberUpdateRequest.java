package com.team_damda.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberUpdateRequest {
    private String userEmail;
    private String password;
    private String name;
    private String phone;
}
