package com.team_damda.domain.controller;


import com.team_damda.domain.dto.ClassDto;
import com.team_damda.domain.dto.ClassImageDto;
import com.team_damda.domain.dto.ClassReservationResponse;
import com.team_damda.domain.dto.ClassTimeDto;
import com.team_damda.domain.entity.Category;
import com.team_damda.domain.entity.ClassReservation;
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

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
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

//    @GetMapping("/class-reservation/{id}")
//    public ResponseEntity<ClassDto> getClass(@PathVariable("id") Long id) {
//        log.info("id값1: {}",id);
//        ClassDto classDetails = classService.getClass(id).toDto();
//        List<ClassTimeDto> classTimes = classService.getClassTimes(id);
//        log.info("클래스정보: {}",classDetails);
//        return new ResponseEntity<>(classDetails, HttpStatus.OK);
//    }

}
