package com.sumin.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Table(name="class_image")
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class aClass;

    @Column(name="image")
    private String imageUrl;

}
