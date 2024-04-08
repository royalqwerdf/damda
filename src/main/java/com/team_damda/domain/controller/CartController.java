package com.team_damda.domain.controller;

import com.team_damda.domain.dto.CartDto;
import com.team_damda.domain.entity.Cart;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.entity.ClassTime;
import com.team_damda.domain.repository.ClassTimeRepository;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.CartService;
import com.team_damda.domain.util.CookieUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class CartController {
    private final CartService cartService;
    private final ClassTimeRepository classTimeRepository;
    private final MemberRepository memberRepository;


    // 클래스 게시글에서 해당 클래스를 장바구니에 담기
    @PostMapping("/carts/{classTime_id}")
    public ResponseEntity<Cart> addCart(@PathVariable Long id, @RequestBody CartDto cartDto, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
        Long classTimeId = cartDto.getClassTime().getId();
        // 로그인 한 사용자인지 확인
        Long memberId = (Long) session.getAttribute("memberId");
        // 이미 장바구니에 담긴 클래스인지 확인
        Cart existingCart = null;
        //클래스 시간
        ClassTime classTime = classTimeRepository.findById(classTimeId).orElse(null);

        // 비회원인 경우
        if(memberId == null) {
            // 회원 ID와 겹치지 않게 하기 위해서 다른 자료형을 사용
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
            existingCart = cartService.getByCookieValueAndClassTimeId(cookieValue, classTimeId);

            // 장바구니에 이미 담겨 있는 경우
            if(existingCart != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }

            // 장바구니에 담겨 있지 않은 경우
            Cart cart = Cart.builder()
                    .classTime(classTime)
                    .cookieValue(cookieValue)
                    .selectedCount(cartDto.getSelectedCount())
                    .totalPrice(cartDto.getTotalPrice())
                    .build();
            Cart addedCart = cartService.save(cart);
            return ResponseEntity.status(HttpStatus.OK).body(addedCart);

        }

        // 회원인 경우
        else {
            existingCart = cartService.getByMemberIdAndClassTimeId(memberId, classTimeId);

            // 장바구니에 이미 담겨 있는 경우
            if(existingCart != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }

            // 장바구니에 담겨 있지 않은 경우
            Member member = memberRepository.findById(memberId).orElse(null);
            if (member == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 회원을 찾을 수 없음
            }

            Cart cart = Cart.builder()
                    .classTime(classTime)
                    .member(member)
                    .selectedCount(cartDto.getSelectedCount())
                    .totalPrice(cartDto.getTotalPrice())
                    .build();
            Cart addedCart = cartService.save(cart);
            return ResponseEntity.status(HttpStatus.OK).body(addedCart);

        }
    }

    // 카트 목록 가져오기
    @GetMapping("/carts")
    public ResponseEntity<List<Cart>> getAllCarts(HttpSession session, HttpServletRequest request) {
        Long memberId = (Long) session.getAttribute("memberId");

        List<Cart> carts = null;

        if (memberId != null) { // 회원인 경우
            carts = cartService.getAllCartsByMemberId(memberId);
        } else { // 비회원인 경우
            // 쿠키값 확인
            String cookieValue = CookieUtils.getCookieValue(request, "cookieValue");
            if (cookieValue != null) {
                carts = cartService.getAllCartsByCookieValue(cookieValue);
            }
        }

        if (carts == null) {
            carts = Collections.emptyList(); // 카트가 비어있을 경우 빈 리스트 반환
        }

        return ResponseEntity.ok(carts);
    }

    // 카트 삭제
    @DeleteMapping("/carts/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id, HttpSession session, HttpServletRequest request){
        Long memberId = (Long) session.getAttribute("memberId");
        // 삭제 성공 여부
        boolean isDeleted = false;

        if (memberId != null) { // 회원인 경우
            isDeleted = cartService.deleteCartForMember(memberId, id);
        } else { // 비회원인 경우
            // 쿠키값 확인
            String cookieValue = CookieUtils.getCookieValue(request, "cookieValue");
            if (cookieValue != null) {
                isDeleted = cartService.deleteCartForGuest(cookieValue, id);
            }
        }

        // 삭제되면 OK 반환
        if(isDeleted) return ResponseEntity.ok().build();
        else return ResponseEntity.notFound().build();
    }

    // 카트 수정
    @PutMapping("/carts/{cart_id}")
    public ResponseEntity<Void> updateCart(@PathVariable Long id, int selectedCount, HttpSession session, HttpServletRequest request) {
        Long memberId = (Long) session.getAttribute("memberId");
        // 수정 성공 여부
        boolean isUpdated = false;

        if (memberId != null) { // 회원인 경우
            isUpdated = cartService.updateCartForMember(memberId, id, selectedCount);
        } else { // 비회원인 경우
            // 쿠키값 확인
            String cookieValue = CookieUtils.getCookieValue(request, "cookieValue");
            if (cookieValue != null) {
                isUpdated = cartService.updateCartForGuest(cookieValue, id, selectedCount);
            }
        }

        // 수정되면 OK 반환
        if(isUpdated) return ResponseEntity.ok().build();
        else return ResponseEntity.notFound().build();
    }

    // 카트가 비었는지 확인
    @GetMapping("/carts/isEmpty")
    public ResponseEntity<Boolean> isCartEmpty(HttpSession session, HttpServletRequest request) {
        Long memberId = (Long) session.getAttribute("memberId");

        boolean isEmpty = false;

        if(memberId != null) {
            List<Cart> carts = cartService.getAllCartsByMemberId(memberId);
            if(carts.size() == 0) isEmpty = true;
        } else {
            String cookieValue = CookieUtils.getCookieValue(request, "cookieValue");
            if(cookieValue != null) {
                List<Cart> carts = cartService.getAllCartsByCookieValue(cookieValue);
                if(carts.size() == 0) isEmpty = true;
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.ok(isEmpty);
    }

    // 카트가 몇 개 담겨있는지 확인
    @GetMapping("/carts/count")
    public ResponseEntity<Integer> countCarts(HttpSession session, HttpServletRequest request) {
        Long memberId = (Long) session.getAttribute("memberId");

        int count = 0;

        if(memberId != null) {
            List<Cart> carts = cartService.getAllCartsByMemberId(memberId);
            count = carts.size();
        } else {
            String cookieValue = CookieUtils.getCookieValue(request, "cookieValue");
            if(cookieValue != null) {
                List<Cart> carts = cartService.getAllCartsByCookieValue(cookieValue);
                count = carts.size();
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.ok(count);
    }
}
