package com.sumin.team_damda.domain.dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryDto {

    private long id;
    private String categoryName;

}
