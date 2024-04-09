package com.team_damda.domain.entity;

import com.team_damda.domain.dto.ClassTimeDto;
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
    private String classStartsAt;

    @Column(name="class_end_at")
    private String classEndsAt;

    @Column(name="headcount")
    private int headcount;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class onedayClass;

    public ClassTimeDto toDto() {
        return ClassTimeDto.builder()
                .id(this.id)
                .classStartsAt(this.classStartsAt)
                .classEndsAt(this.classEndsAt)
                .headcount(this.headcount)
                .className(this.onedayClass.getClassName())
                .build();
    }

}
