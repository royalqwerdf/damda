package com.team_damda.domain.entity;

import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.text.SimpleDateFormat;

@Entity
@Table(name="inquiry")
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@EnableJpaAuditing
public class Inquiry extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="type")
    private String type;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    @Column(name="reply")
    private String reply;

    @Column(name="comment_yn")
    private String comment_yn;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Member member;

    public InquiryDto toDto() {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String formattedDate = dateFormat.format(this.getCreatedAt());

        String memberRole;
        Role role = this.member.getRole();
        if (role == Role.MANAGER) {
            memberRole = "운영자";
        } else if (role == Role.USER) {
            memberRole = "일반";
        } else {
            memberRole = "Unknown";
        }

        String comment;
        if(this.comment_yn.equals("y")) {
            comment = "완료";
        } else {
            comment = " ";
        }

        return InquiryDto.builder()
                .id(this.id)
                .title(this.title)
                .content(this.content)
                .reply(this.reply)
                .comment_yn(comment)
                .type(this.type)
                .createdAt(formattedDate)
                .memberRole(memberRole)
                .emailId(this.member.getUserEmail())
                .memberId(this.member.getId())
                .build();
    }
}
