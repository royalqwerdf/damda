package com.team_damda.domain.service;

import com.team_damda.domain.dto.CartDto;
import com.team_damda.domain.dto.ClassReservationCartResponse;
import com.team_damda.domain.dto.ClassReservationDto;
import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.exception.NotFoundException;
import com.team_damda.domain.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ClassReservationService {
    private final ClassRepository classRepository;
    private final ClassReservationRepository classReservationRepository;
    private final ClassTimeRepository classTimeRepository;
    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;
    private final ClassLikeRepository classLikeRepository;

    private final ReservationImpl reservation;

    @Autowired
    public ClassReservationService(ClassRepository classRepository,ClassReservationRepository classReservationRepository,
                                   ClassTimeRepository classTimeRepository,CartRepository cartRepository,
                                   MemberRepository memberRepository,ClassLikeRepository classLikeRepository,
                                   ReservationImpl reservation){
        this.classRepository = classRepository;
        this.classReservationRepository = classReservationRepository;
        this.classTimeRepository = classTimeRepository;
        this.cartRepository= cartRepository;
        this.memberRepository =  memberRepository;
        this.classLikeRepository = classLikeRepository;
        this.reservation = reservation;
    }
    @Transactional
    public void createReservation(ClassReservationDto reservationDto) {
        // DTO를 Entity로 변환
        Class reservationClass = classRepository.findById(reservationDto.getId()).orElse(null);
        Member member =memberRepository.findById(reservationDto.getUser_id()).orElse(null);
        ClassReservation reservation = reservationDto.toEntity();
        reservation.setMember(member);
        reservation.setOnedayClass(reservationClass);
        reservation.setUserEmail(member.getUserEmail());
        reservation.setClassName(reservationClass.getClassName());


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
    @Transactional
    public List<ClassReservationDto> getMemberReservation(Long memberId){
        List<ClassReservation> classReservations = classReservationRepository.findByMember_Id(memberId);
        List<ClassReservationDto> classReservationDtos = new ArrayList<>();

        for (ClassReservation reservation : classReservations) {
            ClassReservationDto reservationDto = reservation.toDto();
            ClassTime classTime = classTimeRepository.findById(reservationDto.getSelect_time()).orElse(null);
            String startAt = classTime.getClassStartsAt();
            reservationDto.setStartAt(startAt);
            reservationDto.setClassName(reservation.getOnedayClass().getClassName());
            reservationDto.setClassId(reservation.getOnedayClass().getId());
//            reservationDto.setOnedayClass(null);
            classReservationDtos.add(reservationDto);

        }
        return classReservationDtos;
    }

    @Transactional
    public ClassReservation getmemberInfo(Long memberId,Long classId) {
        return classReservationRepository.findByMemberIdAndOnedayClassId(memberId,classId).stream().findFirst().orElse(null);
    }

    @Transactional
    public Boolean getClassLike(Long memberId,Long classId){
        if(classLikeRepository.findByMemberIdAndOnedayClassId(memberId,classId)!=null){
            return true;
        }
        else{
            return false;
        }

    }
    @Transactional
    public void createClassLike(Long memberId,Long classId){
        ClassLike classLike = new ClassLike();
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        Class onedayClass = classRepository.findClassById(classId);
        onedayClass.setTotalLike(onedayClass.getTotalLike()+1);
        classRepository.save(onedayClass);
        classLike.setOnedayClass(onedayClass);
        classLike.setMember(member);
        classLikeRepository.save(classLike);
    }
    @Transactional
    public void deleteClassLike(Long memberId,Long classId){
        Class onedayClass = classRepository.findClassById(classId);
        onedayClass.setTotalLike(onedayClass.getTotalLike()-1);
        classRepository.save(onedayClass);
        classLikeRepository.deleteByMemberIdAndOnedayClassId(memberId,classId);
    }

    public void delete(Long id){
        ClassReservation classReservation = classReservationRepository.findById(id).orElse(null);
        Long classTimeId = classReservation.getSelect_time();
        int headcount = classReservation.getSelect_person();
        ClassTime classTime = classTimeRepository.findById(classTimeId).orElse(null);
        classTime.setHeadcount(classTime.getHeadcount()+headcount);
        classTimeRepository.save(classTime);
        classReservationRepository.deleteById(id);
    }

    @Transactional
    public Page<ClassReservationDto> getReservationByOrder(PageRequest pageRequest) {
        Page<ClassReservation> reservationPage = classReservationRepository.findAllByOrderByReservationDateTimeDesc(pageRequest);
        return reservationPage.map(ClassReservation::toDto);
    }

    @Transactional
    public void deleteReserve(Long reserveId) {
        ClassReservation reservation = classReservationRepository.findClassReservationById(reserveId);
        classReservationRepository.delete(reservation);
    }

    @Transactional
    public List<ClassReservation> sortReservation(String ca, String cl, String se, Date sd, Date ed) {
        List<ClassReservation> searchReserves = new ArrayList<>();

        if(cl.equals("아이디")) {
            searchReserves = reservation.searchReservationByEmail(ca, se, sd, ed);
        } else if (cl.equals("클래스")) {
            searchReserves = reservation.searchReservationByClassName(ca, se, sd, ed);
        }

        for(ClassReservation classReservation : searchReserves) {
            System.out.println("!3!3!3!3!3 : " + classReservation.getClassName());
        }

        return  searchReserves;
    }


};
