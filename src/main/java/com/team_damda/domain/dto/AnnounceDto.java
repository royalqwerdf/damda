package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnnounceDto {

    private long id;
    private String title;
    private String content;
    private long memberId;
    private Date updatedAt;
    private Date createdAt;
}
