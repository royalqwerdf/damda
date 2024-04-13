package com.team_damda.domain.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Data
public class ClassReservationResponse {
    private ClassDto classDetails;
    private List<ClassTimeDto> classTimes;
    private List<ClassImageDto> classImages;
    // 생성자, 게터, 세터 등 필요한 메서드 추가
    public ClassReservationResponse(ClassDto classDetails, List<ClassTimeDto> classTimes,
                                    List<ClassImageDto> classImages) {
        this.classDetails = classDetails;
        this.classTimes = classTimes;
        this.classImages =classImages;
    }
}