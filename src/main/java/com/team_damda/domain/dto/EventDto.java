package com.team_damda.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventDto {
    private Long id;
    private String title;
    private String content;
    private String image;
}
