package com.team_damda.domain.service;

import com.team_damda.domain.dto.ClassReservationDto;
import com.team_damda.domain.entity.ClassReservation;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.repository.ClassRepository;
import com.team_damda.domain.repository.ClassReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassReservationService {
    private final ClassRepository classRepository;
    private final ClassReservationRepository classReservationRepository;

    @Autowired
    public ClassReservationService(ClassRepository classRepository,ClassReservationRepository classReservationRepository){
        this.classRepository = classRepository;
        this.classReservationRepository = classReservationRepository;
    }
    public void createReservation(ClassReservationDto reservationDto) {
        // DTO를 Entity로 변환
        Class reservationClass = classRepository.findById(reservationDto.getId()).orElse(null);
        ClassReservation reservation = reservationDto.toEntity(reservationClass);
        // 예약 데이터 저장
        classReservationRepository.save(reservation);
    }
}
