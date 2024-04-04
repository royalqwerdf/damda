package com.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="cart")
@Builder
@EnableJpaAuditing
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "cookie_value")
    private String cookieValue;

    @Column(name = "selected_count", nullable = false)
    private int selectedCount;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "class_time_id", nullable = false)
    private ClassTime classTime;

    @Column(name = "total_price", nullable = false)
    private int totalPrice;

    @CreatedDate
    @Column(name = "add_at", nullable = false)
    private LocalDateTime addAt;

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

    public Cart(ClassTime classTime, int selectedCount, int totalPrice) {
        this.classTime = classTime;
        this.selectedCount = selectedCount;
        this.totalPrice = totalPrice;
    }

}
