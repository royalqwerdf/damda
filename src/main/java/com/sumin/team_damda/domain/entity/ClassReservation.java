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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member member;

    @Column(name="reservation_date_time")
    private LocalDateTime reservationDateTime;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class aClass;

    @Column(name="total_headcount")
    private int total_headcount;

    @Column(name="total_price")
    private int total_price;

    @Column(name="reservation_completed_time")
    private LocalDateTime reservationCompletedTime;

}