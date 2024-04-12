package com.team_damda.domain.entity;

import com.team_damda.domain.dto.InquiryDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

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
        return InquiryDto.builder()
                .id(this.id)
                .title(this.title)
                .content(this.content)
                .reply(this.reply)
                .comment_yn(this.comment_yn)
                .type(this.type)
                .createdAt(this.getCreatedAt())
                .memberId(this.member.getId())
                .build();
    }


}
