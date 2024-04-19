package com.team_damda.domain.controller;

import com.team_damda.domain.dto.CartDto;
import com.team_damda.domain.entity.Cart;
import com.team_damda.domain.entity.ClassTime;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.CartRepository;
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
    private final CartRepository cartRepository;

    // 클래스 게시글에서 해당 클래스를 장바구니에 담기
    @PostMapping("/carts/{classTimeId}")
    public ResponseEntity<Cart> addCart(@PathVariable Long classTimeId, @RequestBody CartDto cartDto, @RequestParam(name = "memberId", required = false) Long memberId, HttpServletRequest request, HttpServletResponse response) {
        // 이미 장바구니에 담긴 클래스인지 확인
        Cart existingCart = null;
        // 클래스 시간
        ClassTime classTime = classTimeRepository.findById(classTimeId).orElse(null);
        if (classTime == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 클래스를 찾을 수 없음
        }


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
    public ResponseEntity<List<CartDto>> getAllCarts(@RequestParam(name = "memberId", required = false) Long memberId, HttpServletRequest request) {
        List<CartDto> carts = null;

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
    public ResponseEntity<Void> deleteCart(@PathVariable Long cartId){
        // 삭제 성공 여부
        boolean isDeleted = cartService.deleteCart(cartId);

        // 삭제되면 OK 반환
        if(isDeleted) return ResponseEntity.ok().build();
        else return ResponseEntity.notFound().build();
    }

    // 카트 수정
    @PutMapping("/carts/{cartId}")
    public ResponseEntity<Void> updateCart(@PathVariable Long cartId, Integer selectedCount, Integer totalPrice) {
        // 수정 성공 여부
        boolean isUpdated = cartService.updateCart(cartId, selectedCount, totalPrice);

        // 수정되면 OK 반환
        if(isUpdated) return ResponseEntity.ok().build();
        else return ResponseEntity.notFound().build();
    }

    // 카트가 비었는지 확인
    @GetMapping("/carts/isEmpty")
    public ResponseEntity<Boolean> isCartEmpty(@RequestParam(name = "memberId", required = false) Long memberId, HttpServletRequest request) {
        boolean isEmpty = false;

        if(memberId != null) {
            List<CartDto> carts = cartService.getAllCartsByMemberId(memberId);
            if(carts.isEmpty()) isEmpty = true;
        } else {
            String cookieValue = CookieUtils.getCookieValue(request, "cookieValue");
            if(cookieValue != null) {
                List<CartDto> carts = cartService.getAllCartsByCookieValue(cookieValue);
                if(carts.isEmpty()) isEmpty = true;
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.ok(isEmpty);
    }

    // 카트가 몇 개 담겨있는지 확인
    @GetMapping("/carts/count")
    public ResponseEntity<Integer> countCarts(@RequestParam(name = "memberId", required = false) Long memberId, HttpServletRequest request) {
        int count = 0;

        if(memberId != null) {
            List<CartDto> carts = cartService.getAllCartsByMemberId(memberId);
            count = carts.size();
        } else {
            String cookieValue = CookieUtils.getCookieValue(request, "cookieValue");
            if(cookieValue != null) {
                List<CartDto> carts = cartService.getAllCartsByCookieValue(cookieValue);
                count = carts.size();
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.ok(count);
    }
}
