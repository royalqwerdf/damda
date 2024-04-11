package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassTime;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
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
                .classDate(this.classDate)
                .headcount(this.headcount)
                .onedayClass(onedayClass)
                .build();

    }

}
