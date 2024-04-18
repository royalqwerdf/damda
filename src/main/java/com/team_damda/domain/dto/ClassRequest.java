package com.team_damda.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ClassRequest {
    private String category;
    private String classId;
    private String searching;
    private Date startDay;
    private Date endDay;
}
