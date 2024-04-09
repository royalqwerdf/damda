package com.team_damda.domain.service;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.dto.CartDto;
import com.team_damda.domain.entity.Cart;
import com.team_damda.domain.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CartService {
    private final CartRepository cartRepository;

    // 회원 카트 저장
    public Cart saveForMember(Long memberId, CartDto cartDto) {
        return cartRepository.saveForMember(memberId, cartDto);
    }

    // 비회원 카트 저장
    public Cart saveForGuest(String cookieValue, CartDto cartDto) {
        return cartRepository.saveForGuest(cookieValue, cartDto);
    }

    // 회원 카트에 동일 클래스 시간이 이미 담겨있는지 확인
    public Cart getByMemberIdAndClassTimeId(Long memberId, Long classTimeId) {
        return cartRepository.getByMemberIdAndClassTimeId(memberId, classTimeId);
    }

    // 비회원 카트에 동일 클래스 시간이 이미 담겨있는지 확인
    public Cart getByCookieValueAndClassTimeId(String cookieValue, Long classTimeId) {
        return cartRepository.getByCookieValueAndClassTimeId(cookieValue, classTimeId);
    }

    // 회원 카트 불러오기
    public List<Cart> getAllCartsByMemberId(Long memberId) {
        return cartRepository.getAllCartsByMemberId(memberId);
    }

    // 비회원 카트 불러오기
    public List<Cart> getAllCartsByCookieValue(String cookieValue) {
        return cartRepository.getAllCartsByCookieValue(cookieValue);
    }

    // 회원 카트 삭제하기 (성공하면 true)
    public boolean deleteCartForMember(Long memberId, Long cartId) {
        Cart cart = cartRepository.getByMemberIdAndCartId(memberId, cartId);
        if(cart != null) {
            cartRepository.delete(cart);
            return true;
        } else {
            return false;
        }
    }

    // 비회원 카트 삭제하기
    public boolean deleteCartForGuest(String cookieValue, Long cartId) {
        Cart cart = cartRepository.getByCookieValueAndCartId(cookieValue, cartId);
        if(cart != null) {
            cartRepository.delete(cart);
            return true;
        } else {
            return false;
        }
    }
    // 회원 카트 수정하기
    public boolean updateCartForMember(Long memberId, Long cartId, int selectedCount) {
        Cart cart = cartRepository.getByMemberIdAndCartId(memberId, cartId);
        if(cart != null) {
            // 인원수 변경
            cart.setSelectedCount(selectedCount);

            // 총 가격 변경
            Class onedayClass = cart.getClassTime().getOnedayClass();
            cart.setTotalPrice(onedayClass.getPrice() * selectedCount);
            return true;
        } else {
            return false;
        }
    }

    // 비회원 카트 수정하기
    public boolean updateCartForGuest(String cookieValue, Long cartId, int selectedCount) {
        Cart cart = cartRepository.getByCookieValueAndCartId(cookieValue, cartId);
        if(cart != null) {
            // 인원수 변경
            cart.setSelectedCount(selectedCount);

            // 총 가격 변경
            Class onedayClass = cart.getClassTime().getOnedayClass();
            cart.setTotalPrice(onedayClass.getPrice() * selectedCount);
            return true;
        } else {
            return false;
        }
    }
}
