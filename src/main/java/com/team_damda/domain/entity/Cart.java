package com.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="cart")
@Builder
public class Cart extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cookie_value")
    private String cookieValue;

    @Column(name = "selected_count", nullable = false)
    private int selectedCount;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "class_time_id", nullable = false)
    private ClassTime classTime;

    @Column(name = "total_price", nullable = false)
    private int totalPrice;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Member member;


    @Builder
    public Cart(Member member, ClassTime classTime, int selectedCount, int totalPrice) {
        this.member = member;
        this.classTime = classTime;
        this.selectedCount = selectedCount;
        this.totalPrice = totalPrice;
    }

    @Builder
    public Cart(String cookieValue, ClassTime classTime, int selectedCount, int totalPrice) {
        this.cookieValue = cookieValue;
        this.classTime = classTime;
        this.selectedCount = selectedCount;
        this.totalPrice = totalPrice;
    }

    public Cart(ClassTime classTime, int selectedCount) {
        this.classTime = classTime;
        this.selectedCount = selectedCount;
    }

    public Cart(ClassTime classTime, int selectedCount, int totalPrice) {
        this.classTime = classTime;
        this.selectedCount = selectedCount;
        this.totalPrice = totalPrice;
    }

}
