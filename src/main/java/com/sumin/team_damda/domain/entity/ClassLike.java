package com.sumin.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="class_like")
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class ClassLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class aClass;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Member member;
}
