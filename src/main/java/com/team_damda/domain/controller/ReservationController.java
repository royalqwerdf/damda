package com.team_damda.domain.controller;


import com.team_damda.domain.dto.*;
import com.team_damda.domain.entity.Cart;
import com.team_damda.domain.entity.ClassTime;
import com.team_damda.domain.repository.CategoryRepository;
import com.team_damda.domain.repository.ClassRepository;
import com.team_damda.domain.repository.ClassTimeRepository;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.CartService;
import com.team_damda.domain.service.ClassReservationService;
import com.team_damda.domain.service.ClassService;
import jakarta.persistence.EntityNotFoundException;
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
    private final ClassReservationService classReservationService;
    private final ClassRepository classRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final ClassTimeRepository classTimeRepository;
    private final CartService cartService;



    // 클래스 관련 데이터를 전부가져옴
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

    // 예약 -> 결제 데이터를 처리
    @PostMapping("/class-reservation/{id}/reserve")
    public ResponseEntity<String> createReservation(@RequestBody ClassReservationDto reservationDto) {
        classReservationService.createReservation(reservationDto);
        log.info("data: {}",reservationDto);
        return ResponseEntity.ok("예약이 완료되었습니다.");
    }
    // 예약-> 장바구니 담기 데이터 처리
    @PostMapping("/class-reservation/{id}/add-to-cart")
    public ResponseEntity<String> createReservation(@RequestBody CartDto cartDto) {
        log.info("data: {}",cartDto);
        ClassTime classTime = classTimeRepository.findById(cartDto.getClassTimeId())
                .orElseThrow(() -> new EntityNotFoundException("ClassTime not found"));
        Cart cart = new Cart();
        cart.setSelectedCount(cartDto.getSelectedCount());
        cart.setTotalPrice(cartDto.getTotalPrice());
        cart.setClassTime(classTime); // 이미 영속성 컨텍스트에 있는 엔티티를 사용

        cartService.save(cart);
        log.info("data: {}",cartDto);
        return ResponseEntity.ok("담기가 완료되었습니다.");
    }

    @GetMapping("/member-reservation/{memberId}")
    public List<ClassReservationDto> getReservation(@PathVariable("memberId") Long memberId) {
        System.out.println(classReservationService.getMemberReservation(memberId));
        return classReservationService.getMemberReservation(memberId);
    }

}
