package com.team_damda.domain.entity;

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

    @Column(name="image")
    private String imageUrl;

    @Column(name="main_yn", length = 1)
    private String main_yn;

    @Column(name="image_name")
    private String imageName;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class onedayClass;

}
