//package com.team_damda.domain.dto;
//
//import com.team_damda.domain.entity.Cart;
//import com.team_damda.domain.entity.ClassTime;
//import com.team_damda.domain.entity.Member;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.CreatedDate;
//
//import java.time.LocalDateTime;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class CartDto {
//    private Member member;
//    private String cookieValue;
//    private ClassTime classTime;
//    private int selectedCount;
//    private int totalPrice;
//
//    public Cart toEntity() {
//        if(member != null) {
//            return Cart.builder()
//                    .member(member)
//                    .classTime(classTime)
//                    .selectedCount(selectedCount)
//                    .totalPrice(totalPrice)
//                    .build();
//        }
//        return Cart.builder()
//                .cookieValue(cookieValue)
//                .classTime(classTime)
//                .selectedCount(selectedCount)
//                .totalPrice(totalPrice)
//                .build();
//    }
//
//    public CartDto(Cart cart) {
//        if(cart.getMember() != null)
//            this.member = cart.getMember();
//        if(cart.getCookieValue() != null)
//            this.cookieValue = cart.getCookieValue();
//        this.classTime = cart.getClassTime();
//        this.selectedCount = cart.getSelectedCount();
//        this.totalPrice = cart.getTotalPrice();
//    }
//
//    public CartDto(Member member, ClassTime classTime, int selectedCount, int totalPrice) {
//        this.member = member;
//        this.classTime = classTime;
//        this.selectedCount = selectedCount;
//        this.totalPrice = totalPrice;
//    }
//
//    public CartDto(String cookieValue, ClassTime classTime, int selectedCount, int totalPrice) {
//        this.cookieValue = cookieValue;
//        this.classTime = classTime;
//        this.selectedCount = selectedCount;
//        this.totalPrice = totalPrice;
//    }
//}
