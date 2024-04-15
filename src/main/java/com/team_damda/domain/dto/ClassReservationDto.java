package com.team_damda.domain.dto;


import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassReservation;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class ClassReservationDto {
    private long id;
    private int select_person;
    private int total_price;
    private Date select_date;
    private Class ondayClass;



    public ClassReservation toEntity(Class ondayClass) {
        return ClassReservation.builder()
                .ondayClass(ondayClass)
                .select_person(this.select_person)
                .total_price(this.total_price)
                .select_date(this.select_date)
                .build();

    }


}
