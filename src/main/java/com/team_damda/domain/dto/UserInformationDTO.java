package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.enums.Role;
import lombok.Data;

@Data
public class UserInformationDTO {
    private long id;
    private String userEmail;
    private String imageUrl;
    private String sns_ny;
    private Role role;
    private LoginType loginType;
    private String refreshToken;
    private String password;
    private String name;
    private String phone;

    public static UserInformationDTO fromEntity(Member member) {
        if (member == null) {
            return null;
        }

        UserInformationDTO userInformationDTO = new UserInformationDTO();
        userInformationDTO.setId(member.getId());
        userInformationDTO.setPassword(member.getPassword());
        userInformationDTO.setName(member.getName());
        userInformationDTO.setPhone(member.getPhone());
        userInformationDTO.setUserEmail(member.getUserEmail());

        return userInformationDTO;
    }
}
