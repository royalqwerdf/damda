package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.entity.Member;
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

    private long memberId;

    private Member member;

    public Inquiry toEntity(Member member) {
        return Inquiry.builder()
                .title(this.title)
                .content(this.content)
                .reply(this.reply)
                .comment_yn(this.comment_yn)
                .type(this.type)
                .member(member)
                .build();
    }
}
