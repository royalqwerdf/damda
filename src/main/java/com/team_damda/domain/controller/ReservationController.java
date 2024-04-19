package com.team_damda.domain.controller;


import com.team_damda.domain.dto.*;
import com.team_damda.domain.entity.*;
import com.team_damda.domain.repository.CategoryRepository;
import com.team_damda.domain.repository.ClassRepository;
import com.team_damda.domain.repository.ClassTimeRepository;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.CartService;
import com.team_damda.domain.service.ClassReservationService;
import com.team_damda.domain.service.ClassReviewService;
import com.team_damda.domain.service.ClassService;
import com.team_damda.domain.util.CookieUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@Slf4j
public class ReservationController {
    private final ClassService classService;
    private final ClassReservationService classReservationService;
    private final ClassRepository classRepository;
    private final MemberRepository memberRepository;
    private final ClassTimeRepository classTimeRepository;
    private final CartService cartService;
    private final ClassReviewService classReviewService;



    // 클래스 관련 데이터를 전부가져옴
    @GetMapping("/class-reservation/{id}")
    public ResponseEntity<ClassReservationResponse> getClass( @PathVariable("id") Long id) {
        log.info("id값1: {}",id);
        ClassDto classDetails = classService.getClass(id).toDto();
        List<ClassTimeDto> classTimes = classService.getClassTimes(id);
        List<ClassImageDto> classImages = classService.getClassImages(id);
        List<ClassReviewDto> classReviews = classReviewService.getClassReview(id);
        log.info("클래스정보: {}",classDetails);
        ClassReservationResponse response = new ClassReservationResponse(classDetails, classTimes,classImages,classReviews);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/class-reservation/{id}/{memberId}")
    public ResponseEntity<Boolean> getClass(@PathVariable("memberId") Long memberId, @PathVariable("id") Long id) {
        log.info("id값1: {}",id);
        Boolean classLike = classReservationService.getClassLike(memberId,id);

        log.info("찡정보: {}",classLike);

        return new ResponseEntity<>(classLike, HttpStatus.OK);
    }

    @GetMapping("/class-reservation/{id}/{memberId}/review")
    public ResponseEntity<ClassReservationDto> getReservationInfo(@PathVariable("memberId") Long memberId,@PathVariable("id") Long id){
        log.info("id값1: {}",memberId);
        ClassReservationDto reservationInfo = classReservationService.getmemberInfo(memberId,id).toDto();
        log.info("data: {}",reservationInfo );
        return new ResponseEntity<>(reservationInfo, HttpStatus.OK);
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
    public ResponseEntity<String> createReservation(@RequestBody CartDto cartDto, HttpServletRequest request, HttpServletResponse response) {
        log.info("data: {}",cartDto);
        ClassTime classTime = classTimeRepository.findById(cartDto.getClassTimeId())
                .orElseThrow(() -> new EntityNotFoundException("ClassTime not found"));

        if(Long.valueOf(cartDto.getUser_id()) != null) {
            Member member = memberRepository.findById(cartDto.getUser_id())
                    .orElseThrow(() -> new EntityNotFoundException("Member not found"));

            Cart cart = new Cart();
            cart.setMember(member);
            cart.setSelectedCount(cartDto.getSelectedCount());
            cart.setTotalPrice(cartDto.getTotalPrice());
            cart.setClassTime(classTime); // 이미 영속성 컨텍스트에 있는 엔티티를 사용

            cartService.save(cart);
            log.info("data: {}", cartDto);
            return ResponseEntity.ok("담기가 완료되었습니다.");
        } else {
            String cookieValue = CookieUtils.getCookieValue(request, "cookieValue");

            // 쿠키가 없을 경우 발급
            if(cookieValue == null) {
                cookieValue = UUID.randomUUID().toString(); // 임의의 문자열 생성
                CookieUtils.addCookie(response, "cookieValue", cookieValue, 24 * 60 * 60 * 3); // 3일 지나면 만료
            }
            // 쿠키가 있을 경우 갱신
            else {
                CookieUtils.updateCookie(response, "cookieValue", cookieValue, 24 * 60 * 60 * 3);
            }

            cookieValue = CookieUtils.getCookieValue(request, "cookieValue");

            Cart cart = new Cart();
            cart.setCookieValue(cookieValue);
            cart.setSelectedCount(cartDto.getSelectedCount());
            cart.setTotalPrice(cartDto.getTotalPrice());
            cart.setClassTime(classTime); // 이미 영속성 컨텍스트에 있는 엔티티를 사용

            cartService.save(cart);
            log.info("data: {}", cartDto);
            return ResponseEntity.ok("담기가 완료되었습니다.");
        }
    }

    @GetMapping("/member-reservation/{memberId}")
    public List<ClassReservationDto> getReservation(@PathVariable("memberId") Long memberId) {
        return classReservationService.getMemberReservation(memberId);
    }

    @PostMapping("/member-reservation/delete/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable("id") Long id) {
        classReservationService.delete(id);
        return ResponseEntity.ok("삭제완료");
    }
    @PostMapping("/class-reservation/class-like/{id}/{memberId}")
    public ResponseEntity<String> updateLike(@RequestParam("isLiked") Boolean isLiked,@PathVariable("memberId") Long memberId,@PathVariable("id") Long id) {
        log.info("data: {}",isLiked);
//        Boolean classLike = classReservationService.getClassLike(memberId,id);
        if(isLiked == false){
            classReservationService.createClassLike(memberId,id);
        }
        else{
            classReservationService.deleteClassLike(memberId,id);
        }

        return ResponseEntity.ok("담기가 완료되었습니다.");
    }

}
