package com.team_damda.domain.service;

import com.team_damda.domain.dto.CartDto;
import com.team_damda.domain.dto.ClassReservationCartResponse;
import com.team_damda.domain.dto.ClassReservationDto;
import com.team_damda.domain.entity.ClassReservation;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassTime;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.exception.NotFoundException;
import com.team_damda.domain.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassReservationService {
    private final ClassRepository classRepository;
    private final ClassReservationRepository classReservationRepository;
    private final ClassTimeRepository classTimeRepository;
    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public ClassReservationService(ClassRepository classRepository,ClassReservationRepository classReservationRepository,
                                   ClassTimeRepository classTimeRepository,CartRepository cartRepository,
                                   MemberRepository memberRepository){
        this.classRepository = classRepository;
        this.classReservationRepository = classReservationRepository;
        this.classTimeRepository = classTimeRepository;
        this.cartRepository= cartRepository;
        this.memberRepository =  memberRepository;
    }
    public void createReservation(ClassReservationDto reservationDto) {
        // DTO를 Entity로 변환
        Class reservationClass = classRepository.findById(reservationDto.getId()).orElse(null);
        Member member =memberRepository.findById(reservationDto.getUser_id()).orElse(null);
        ClassReservation reservation = reservationDto.toEntity();
        reservation.setMember(member);
        reservation.setOnedayClass(reservationClass);


        ClassTime reservationTime = classTimeRepository.findById(reservationDto.getSelect_time())
                .orElseThrow(() -> new EntityNotFoundException("ClassTime not found with id: " + reservationDto.getSelect_time()));

        int UpdatedHeadcount = reservationTime.getHeadcount()-reservationDto.getSelect_person();
        if (UpdatedHeadcount< 0) {
            throw new IllegalArgumentException("Not enough seats available");
        }
        reservationTime.setHeadcount(UpdatedHeadcount);

        // 예약 데이터 저장
        classReservationRepository.save(reservation);
        // 클래스 예약정보 갱신
        classTimeRepository.save(reservationTime);
    }
    public List<ClassReservationDto> getMemberReservation(Long memberId){
        List<ClassReservation> classReservations = classReservationRepository.findByMember_Id(memberId);
        List<ClassReservationDto> classReservationDtos = new ArrayList<>();

        for (ClassReservation reservation : classReservations) {
            ClassReservationDto reservationDto = reservation.toDto();
            ClassTime classTime = classTimeRepository.findById(reservationDto.getSelect_time()).orElse(null);
            String startAt = classTime.getClassStartsAt();
            reservationDto.setStartAt(startAt);
            classReservationDtos.add(reservationDto);

        }
        return classReservationDtos;
    }


    public ClassReservation getmemberInfo(Long memberId,Long classId) {
        return classReservationRepository.findByMemberIdAndOnedayClassId(memberId,classId).stream().findFirst().orElse(null);
    }

    public void delete(Long id){
        classReservationRepository.deleteById(id);
    }


};
