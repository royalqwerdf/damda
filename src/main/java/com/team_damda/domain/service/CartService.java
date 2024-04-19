package com.team_damda.domain.service;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.dto.CartDto;
import com.team_damda.domain.entity.Cart;
import com.team_damda.domain.repository.CartRepository;
import com.team_damda.domain.repository.ClassTimeRepository;
import com.team_damda.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class CartService {
    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;
    private final ClassTimeRepository classTimeRepository;

    // 카트 저장
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }
//    public Cart saveForReservation(Cart cart, Long id){
//        cart.setClassTime(classTimeRepository.findById(id));
//        return cartRepository.save(cart);
//    }

//    public Cart saveForMember(Long memberId, CartDto cartDto) {
//        return cartRepository.saveForMember(memberId, cartDto);
//    }
//
//    // 비회원 카트 저장
//    public Cart saveForGuest(String cookieValue, CartDto cartDto) {
//        return cartRepository.saveForGuest(cookieValue, cartDto);
//    }



    // 회원 카트에 동일 클래스 시간이 이미 담겨있는지 확인
    public Cart getByMemberIdAndClassTimeId(Long memberId, Long classTimeId) {
        return cartRepository.getByMemberIdAndClassTimeId(memberId, classTimeId);
    }

    // 비회원 카트에 동일 클래스 시간이 이미 담겨있는지 확인
    public Cart getByCookieValueAndClassTimeId(String cookieValue, Long classTimeId) {
        return cartRepository.getByCookieValueAndClassTimeId(cookieValue, classTimeId);
    }

    // 회원 카트 불러오기
    public List<CartDto> getAllCartsByMemberId(Long memberId) {
        List<Cart> carts = cartRepository.getAllCartsByMemberId(memberId);
        List<CartDto> cartDtos = new ArrayList<>();
        for(Cart cart: carts) {
            CartDto cartDto = cart.toDto();
            cartDtos.add(cartDto);
        }
        return cartDtos;
    }

    // 비회원 카트 불러오기
    public List<CartDto> getAllCartsByCookieValue(String cookieValue) {
        List<Cart> carts = cartRepository.getAllCartsByCookieValue(cookieValue);
        List<CartDto> cartDtos = new ArrayList<>();
        for(Cart cart: carts) {
            CartDto cartDto = cart.toDto();
            cartDtos.add(cartDto);
        }
        return cartDtos;
    }

    // 회원 카트 삭제하기 (성공하면 true)
    public boolean deleteCartForMember(Long memberId, Long cartId) {
        Cart cart = cartRepository.getByMemberIdAndId(memberId, cartId);
        if(cart != null) {
            cartRepository.delete(cart);
            return true;
        } else {
            return false;
        }
    }

    // 비회원 카트 삭제하기
    public boolean deleteCartForGuest(String cookieValue, Long cartId) {
        Cart cart = cartRepository.getByCookieValueAndId(cookieValue, cartId);
        if(cart != null) {
            cartRepository.delete(cart);
            return true;
        } else {
            return false;
        }
    }
    // 회원 카트 수정하기
    public boolean updateCartForMember(Long memberId, Long cartId, int selectedCount, int totalPrice) {
        Cart cart = cartRepository.getByMemberIdAndId(memberId, cartId);
        if(cart != null) {
            // 인원수 변경
            cart.setSelectedCount(selectedCount);
            // 총 가격 변경
            cart.setTotalPrice(totalPrice);
            return true;
        } else {
            return false;
        }
    }

    // 비회원 카트 수정하기
    public boolean updateCartForGuest(String cookieValue, Long cartId, int selectedCount, int totalPrice) {
        Cart cart = cartRepository.getByCookieValueAndId(cookieValue, cartId);
        if(cart != null) {
            // 인원수 변경
            cart.setSelectedCount(selectedCount);
            // 총 가격 변경
            cart.setTotalPrice(totalPrice);
            return true;
        } else {
            return false;
        }
    }
}

