package com.team_damda.domain.dto;

import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.Category;
import com.team_damda.domain.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ClassDto {
    private long id;
    private String className;
    private String classExplanation;
    private String level;
    private String longtime;
    private String address;
    private String curriculum;
    private int price;
    private float totalRating;
    private int totalLike;
    private Date startDate;
    private Date lastDate;
    private String weekdays;

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
                .level(this.level)
                .longtime(this.longtime)
                .startDate(this.startDate)
                .lastDate(this.lastDate)
                .weekdays(this.weekdays)
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
