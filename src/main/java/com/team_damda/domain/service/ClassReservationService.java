package com.team_damda.domain.service;


import com.team_damda.domain.entity.ClassReservation;
import com.team_damda.domain.entity.OrderDetail;
import com.team_damda.domain.repository.ClassReservationRepository;
import com.team_damda.domain.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClassReservationService {
    @Autowired
    private final ClassReservationRepository classReservationRepository;
    private final OrderDetailRepository orderDetailRespository;

    @Autowired
    public ClassReservationService(ClassReservationRepository classReservationRepository, OrderDetailRepository orderDetailRepository) {
        this.classReservationRepository = classReservationRepository;
        this.orderDetailRespository = orderDetailRepository;
    }
    /*

    public void updateClassReservation(Long classReservationId, ClassReservation updatedReservation) {
        // 주어진 ID로 클래스 예약을 찾습니다.
        Optional<ClassReservation> optionalReservation = classReservationRepository.findById(classReservationId);

        if (optionalReservation.isPresent()) {
            // 클래스 예약을 찾았으면 업데이트된 정보로 업데이트합니다.
            ClassReservation existingReservation = optionalReservation.get();
            existingReservation.setSomeProperty(updatedReservation.getSomeProperty());
            existingReservation.setSomeProperty(updatedReservation.getSomeProperty());
            existingReservation.setSomeProperty(updatedReservation.getSomeProperty());// 업데이트할 속성들을 설정합니다.

            // 변경된 내용을 저장합니다.
            classReservationRepository.save(existingReservation);
        } else {
            // 클래스 예약을 찾지 못한 경우 예외 처리 또는 다른 작업을 수행할 수 있습니다.
            throw new IllegalArgumentException("Class Reservation with ID " + classReservationId + " not found");
        }
    }
*/


}