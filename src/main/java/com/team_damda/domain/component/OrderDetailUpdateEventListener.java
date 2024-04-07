package com.team_damda.domain.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class OrderDetailUpdateEventListener {

    private final ClassReservationService classReservationService;

    @Autowired
    public OrderDetailUpdateEventListener(ClassReservationService classReservationService) {
        this.classReservationService = classReservationService;
    }

    @EventListener
    public void handleOrderDetailUpdateEvent(OrderDetailUpdateEvent event) {
        // OrderDetail이 수정되었을 때 ClassReservation을 업데이트하는 로직 구현
        // event.getOrderDetail() 메서드를 사용하여 수정된 OrderDetail에 접근
        // classReservationService를 사용하여 ClassReservation을 업데이트
        classReservationService.updateClassReservation(event.getOrderDetail());
    }
}
