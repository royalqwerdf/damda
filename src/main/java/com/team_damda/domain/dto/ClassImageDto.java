package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 전체 파라미터를 갖는 생성자 추가
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
