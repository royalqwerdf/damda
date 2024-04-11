package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassImage;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClassImageDto {
    private long id;
    private String imageUrl;
    private String main_yn;

    private Long classId;
    private Class ondayClass;

    public ClassImage toEntity(Class ondayClass) {
        return ClassImage.builder()
                .imageUrl(this.imageUrl)
                .main_yn(this.main_yn)
                .onedayClass(ondayClass)
                .build();
    }
}
