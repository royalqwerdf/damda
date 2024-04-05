package com.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="class_time")
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class ClassTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="class_start_at")
    private LocalDateTime classStartsAt;

    @Column(name="class_end_at")
    private LocalDateTime classEndsAt;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class onedayClass;

}
