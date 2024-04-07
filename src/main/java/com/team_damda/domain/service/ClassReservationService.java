package com.team_damda.domain.service;

import com.team_damda.domain.entity.ClassReservation;
import com.team_damda.domain.repository.ClassReservationRepository;
import com.team_damda.domain.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassReservationService {
    @Autowired
    private final ClassReservationRepository classReservationRepository;
    private final OrderDetailRepository orderDetailRespository;

    @Autowired
    public ClassReservationService(ClassReservationRepository classReservationRepository, OrderDetailRepository orderDetailRepository){
        this.classReservationRepository = classReservationRepository;
        this.orderDetailRespository = orderDetailRepository;
    }

}
