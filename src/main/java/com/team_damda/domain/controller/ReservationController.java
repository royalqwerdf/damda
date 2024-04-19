package com.team_damda.domain.controller;


import com.team_damda.domain.dto.*;
import com.team_damda.domain.entity.*;
import com.team_damda.domain.repository.*;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Map;

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
    private final OrderDetailRepository orderDetailRepository;



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
    public ResponseEntity<String> createReservation(@RequestBody CartDto cartDto, @CookieValue(name = "guest_cart", required = false) String cookieValue) {
        log.info("data: {}",cartDto);
        log.info("data2: {}",cookieValue);

        ClassTime classTime = classTimeRepository.findById(cartDto.getClassTimeId())
                .orElseThrow(() -> new EntityNotFoundException("ClassTime not found"));
        Cart cart = new Cart();
        cart.setSelectedCount(cartDto.getSelectedCount());
        cart.setTotalPrice(cartDto.getTotalPrice());
        cart.setClassTime(classTime); // 이미 영속성 컨텍스트에 있는 엔티티를 사용
        if(cartDto.getUser_id()!=0){
            Member member = memberRepository.findById(cartDto.getUser_id())
                    .orElseThrow(() -> new EntityNotFoundException("Member not found"));


            cart.setMember(member);
        }else{
            cart.setCookieValue(cartDto.getCookie_value());
        }



        cartService.save(cart);
        log.info("data: {}",cartDto);
        return ResponseEntity.ok("담기가 완료되었습니다.");
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

    @GetMapping("/reservation-manage")
    public Map<String, Object> getReservationList(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<ClassReservationDto> reservation = classReservationService.getReservationByOrder(pageRequest);

        Map<String, Object> result = new HashMap<>();
        result.put("reservations", reservation.getContent());
        result.put("totalPages", reservation.getTotalPages());
        result.put("totalElements", reservation.getTotalElements());

        return result;
    }

    //ClassRequest는 재활용하는 것
    @PostMapping("/reservation-manage")
    public ResponseEntity<Map<String, Object>> getReservationSetting(@RequestBody ClassRequest request) {
        String category = request.getCategory();
        String classId = request.getClassId();
        String searching = request.getSearching();
        Date startDay = request.getStartDay();
        Date endDay = request.getEndDay();

        List<ClassReservation> sortReservations = classReservationService.sortReservation(category, classId, searching, startDay, endDay);

        int pageSize = 10;
        Page<ClassReservation> sortedPage = new PageImpl<>(sortReservations, PageRequest.of(0, pageSize), sortReservations.size());
        Page<ClassReservationDto> sortedDtoPage = sortedPage.map(ClassReservation::toDto);

        Map<String, Object> result = new HashMap<>();
        result.put("reservations", sortedDtoPage.getContent());
        result.put("totalPages", sortedDtoPage.getTotalPages());
        result.put("totalElements", sortedDtoPage.getTotalElements());

        return ResponseEntity.ok().body(result);
    }


    @DeleteMapping("/reserve-delete/{reserveId}")
    public void deleteReserve(@PathVariable("reserveId") Long reserveId) {
        classReservationService.deleteReserve(reserveId);
    }

}
