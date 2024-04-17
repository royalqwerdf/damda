package com.team_damda.domain.dto;


import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassReservation;
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

public class ClassReservationDto {
    private long id;
    private int select_person;
    private int total_price;
    private Date select_date;
    private Class onedayClass;
    private long select_time;
    private String classType;
    private long user_id;
    private String className;
    private String mainImage;

    public ClassReservation toEntity(Class ondayClass) {
        return ClassReservation.builder()
                .onedayClass(onedayClass)
                .select_person(this.select_person)
                .total_price(this.total_price)
                .select_date(this.select_date)
                .select_time(this.select_time)
                .classType(this.classType)
                .build();

    }


}
