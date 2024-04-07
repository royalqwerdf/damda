package com.team_damda.domain.component;

import com.team_damda.domain.repository.OrderDetailRepository;
import com.team_damda.domain.service.ClassReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class OrderDetailUpdateEventListener {
    private final OrderDetailRepository orderDetailRepository;
    private final ClassReservationService classReservationService;

    @Autowired
    public OrderDetailUpdateEventListener(OrderDetailRepository orderDetailRepository, ClassReservationService classReservationService) {
        this.orderDetailRepository = orderDetailRepository;
        this.classReservationService = classReservationService;
    }
    /*
    //OrderDetail수정되면 reservation도 업데이트
    @EventListener
    public void handleOrderDetailUpdateEvent(OrderDetailUpdateEvent event) {
        // OrderDetail이 수정되었을 때 ClassReservation을 업데이트하는 로직 구현
        // event.getOrderDetail() 메서드를 사용하여 수정된 OrderDetail에 접근
        // classReservationService를 사용하여 ClassReservation을 업데이트
        classReservationService.updateClassReservation(event.getOrderDetailByClassReservationId());
    }
    */

}
