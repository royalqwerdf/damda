package com.sumin.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(name="reservation_time")
    private LocalDateTime reservationTime;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class aClass;

    @Column(name="class_type")
    private String classType;

    @Column(name="price")
    private long price;

}