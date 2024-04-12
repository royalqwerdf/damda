
package com.team_damda.domain.repository;

import com.team_damda.domain.dto.CartDto;
import com.team_damda.domain.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart save(Cart cart);
    Cart getByMemberIdAndClassTimeId(Long memberId, Long classTimeId);
    Cart getByCookieValueAndClassTimeId(String cookieValue, Long classTimeId);
    List<Cart> getAllCartsByMemberId(Long memberId);
    List<Cart> getAllCartsByCookieValue(String cookieValue);
    Cart getByMemberIdAndId(Long memberId, Long cartId);
    Cart getByCookieValueAndId(String cookieValue, Long cartId);
}
