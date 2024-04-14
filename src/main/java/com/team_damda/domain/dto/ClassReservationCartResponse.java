package com.team_damda.domain.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@Data
public class ClassReservationCartResponse {
    private CartDto cart;
    private ClassTimeDto classTimes;

    // 생성자, 게터, 세터 등 필요한 메서드 추가
    public ClassReservationCartResponse(CartDto cart, ClassTimeDto classTimes)
                                     {
        this.cart = cart;
        this.classTimes = classTimes;

    }
}
