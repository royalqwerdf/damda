package com.team_damda.domain.controller;


import com.team_damda.domain.dto.*;
import com.team_damda.domain.repository.CategoryRepository;
import com.team_damda.domain.repository.ClassRepository;
import com.team_damda.domain.repository.ClassTimeRepository;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.ClassService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
public class ReservationController {
    private final ClassService classService;

    private final ClassRepository classRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final ClassTimeRepository classTimeRepository;





    @GetMapping("/class-reservation/{id}")
    public ResponseEntity<ClassReservationResponse> getClass(@PathVariable("id") Long id) {
        log.info("id값1: {}",id);
        ClassDto classDetails = classService.getClass(id).toDto();
        List<ClassTimeDto> classTimes = classService.getClassTimes(id);
        List<ClassImageDto> classImages = classService.getClassImages(id);

        log.info("클래스정보: {}",classDetails);
        ClassReservationResponse response = new ClassReservationResponse(classDetails, classTimes,classImages);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    // 예약 데이터를 받아서 처리하는 API 엔드포인트
    @PostMapping("/class-reservation")
    public ResponseEntity<String> createReservation(@RequestBody ClassReservationDto reservationDto) {
        // ReservationDto 객체를 사용하여 예약 로직을 처리
        // 예약 데이터를 데이터베이스에 저장
        // 성공적으로 저장되면, ResponseEntity로 성공 메시지를 전송
        return ResponseEntity.ok("예약이 완료되었습니다.");
    }


}
