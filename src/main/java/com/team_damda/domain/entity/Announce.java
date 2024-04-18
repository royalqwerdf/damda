package com.team_damda.domain.entity;


import com.team_damda.domain.dto.AnnounceDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="announce")
public class Announce extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Member member;

    public AnnounceDto toDto(){
        return AnnounceDto.builder()
                .id(this.id)
                .memberId(this.member.getId())
                .title(this.title)
                .content(this.content)
                .updatedAt(this.getUpdatedAt())
                .createdAt(this.getCreatedAt())
                .build();
    }

}
