package com.sumin.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="class_reservation")
public class ClassReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="reservation_date_time")
    private LocalDateTime reservationDateTime;

    @Column(name="class_type")
    private String classType;

    @Column(name="select_person")
    private int select_person;

    @Column(name="total_price")
    private int total_price;

    @Column(name="select_date")
    private LocalDate select_date;

    @Column(name="select_time")
    private LocalDateTime select_time;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class ondayClass;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member member;

    @OneToOne
    @JoinColumn(name="order_detail_id")
    private OrderDetail orderDetail;
}
