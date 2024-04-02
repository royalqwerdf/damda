package com.sumin.team_damda.domain.entity;


import com.sumin.team_damda.domain.dto.ClassDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="class")
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="class_name")
    private String className;
    @Column(name="class_explanation")
    private String classExplanation;
    @Column(name="headcount")
    private int headcount;
    @Column(name="class_address")
    private String address;
    @Column(name="class_curriculum")
    private String curriculum;
    @Column(name="price")
    private int price;
    @Column(name="total_rating")
    private float totalRating;
    @Column(name="total_like")
    private int totalLike;

    @ManyToOne
    @JoinColumn(name="manager_id")
    private Member manager;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @OneToMany(mappedBy = "ondayClass")
    private List<ClassTime> classTimes = new ArrayList<>();

    @OneToMany(mappedBy = "ondayClass")
    private List<ClassReview> classReviews = new ArrayList<>();

    @OneToMany(mappedBy = "ondayClass")
    private List<ClassLike> classLikes = new ArrayList<>();

    @OneToMany(mappedBy = "ondayClass", cascade = CascadeType.ALL)
    private List<ClassImage> classImages = new ArrayList<>();

    public ClassDto toDto(){
        return ClassDto.builder()
                .id(this.id)
                .className(this.className)
                .classExplanation(this.classExplanation)
                .headcount(this.headcount)
                .address(this.address)
                .curriculum(this.curriculum)
                .price(this.price)
                .totalRating(this.totalRating)
                .totalLike(this.totalLike)
                .categoryName(this.category.getCategoryName())
                .managerName(this.manager.getName())
                .managerPhone(this.manager.getPhone())
                .build();
    }

}
