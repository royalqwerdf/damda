package com.team_damda.domain.dto;

import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.Category;
import com.team_damda.domain.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClassDto {
    private long id;
    private String className;
    private String classExplanation;
    private String address;
    private String curriculum;
    private int price;
    private float totalRating;
    private int totalLike;

    private String categoryName;
    private String managerName;
    private String managerPhone;
    private String mainImage;
    private Long categoryId;

    private Category category;
    private Member manager;

    public Class toEntity(Category category, Member manager){
        return Class.builder()
                .className(this.className)
                .classExplanation(this.classExplanation)
                .address(this.address)
                .curriculum(this.curriculum)
                .price(this.price)
                .totalRating(this.totalRating)
                .totalLike(this.totalLike)
                .category(category)
                .manager(manager)
                .build();
    }

}
