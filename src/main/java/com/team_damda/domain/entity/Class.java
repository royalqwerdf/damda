package com.team_damda.domain.entity;


import com.team_damda.domain.dto.ClassDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="class")
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@EnableJpaAuditing
public class Class extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="class_name")
    private String className;
    @Column(name="class_explanation")
    private String classExplanation;
    @Column(name="level")
    private String level;
    @Column (name="longtime")
    private String longtime;
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

    @OneToMany(mappedBy = "onedayClass")
    private List<ClassTime> classTimes = new ArrayList<>();

    @OneToMany(mappedBy = "onedayClass")
    private List<ClassReview> classReviews = new ArrayList<>();

    @OneToMany(mappedBy = "onedayClass")
    private List<ClassLike> classLikes = new ArrayList<>();

    @OneToMany(mappedBy = "onedayClass", cascade = CascadeType.ALL)
    private List<ClassImage> classImages = new ArrayList<>();

    public ClassDto toDto(){
        String mainImage = "";
        for(ClassImage classImage:classImages){
            if(classImage.getMain_yn().equals("Y")){
                mainImage = classImage.getImageUrl();
            }
        }
        return ClassDto.builder()
                .id(this.id)
                .className(this.className)
                .classExplanation(this.classExplanation)
                .level(this.level)
                .longtime(this.longtime)
                .address(this.address)
                .curriculum(this.curriculum)
                .price(this.price)
                .totalRating(this.totalRating)
                .totalLike(this.totalLike)
                .categoryId(this.category.getId())
                .categoryName(this.category.getCategoryName())
                .managerName(this.manager.getName())
                .managerPhone(this.manager.getPhone())
                .mainImage(mainImage)
                .build();
    }

}
