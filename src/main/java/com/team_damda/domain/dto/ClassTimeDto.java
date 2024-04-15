package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 전체 파라미터를 갖는 생성자 추가
public class ClassTimeDto {
    private long id;
    private String classStartsAt;
    private String classEndsAt;
    private int headcount;
    private Date classDate;
    private String className;
    private Class onedayClass;
    public ClassTime toEntity(Class onedayClass) {
        return ClassTime.builder()
                .classStartsAt(this.classStartsAt)
                .classEndsAt(this.classEndsAt)
                .headcount(this.headcount)
                .classDate(this.classDate)
                .onedayClass(onedayClass)
                .build();

    }

}
