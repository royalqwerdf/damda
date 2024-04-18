package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.Role;
import lombok.Builder;
import lombok.Data;


import java.util.Date;

@Data
@Builder
public class InquiryDto {
    private long id;
    private String title;
    private String content;
    private String reply;
    private String comment_yn;
    private String type;
    private Date createdAt;

    private String user_role;
    private String userEmail;

    private long memberId;

    private Member member;

    public Inquiry toEntity(Member member) {

        String userRole;
        Role role = this.member.getRole();
        if (role == Role.MANAGER) {
            userRole = "호스트";
        } else if (role == Role.USER) {
            userRole = "일반";
        } else {
            userRole = "Unknown";
        }

        return Inquiry.builder()
                .title(this.title)
                .content(this.content)
                .reply(this.reply)
                .comment_yn(this.comment_yn)
                .type(this.type)
                .user_role(userRole)
                .userEmail(member.getUserEmail())
                .member(member)
                .build();
    }
}
