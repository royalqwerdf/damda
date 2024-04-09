package com.team_damda.domain.dto;

import com.team_damda.domain.entity.ClassImage;
import lombok.Data;

import java.util.List;

@Data
public class RequestData {
    private ClassDto classDto;

    private List<ClassTimeDto> classTimeDtos;
    public List<ClassTimeDto> getClassTimeDtos() {
        return classTimeDtos;
    }
    public void setClassTimeDtos(List<ClassTimeDto> classTimeDtos) {
        this.classTimeDtos = classTimeDtos;
    }

    private List<ClassImageDto> classImageDtos;
    public List<ClassImageDto> getClassImageDtos() {
        return classImageDtos;
    }
    public void setClassImageDtos(List<ClassImageDto> classImageDtos) {
        this.classImageDtos = classImageDtos;
    }

}
