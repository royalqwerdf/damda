package com.team_damda.domain.dto;

import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.Category;
import com.team_damda.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 전체 파라미터를 갖는 생성자 추가
public class ClassDto {
    private long id;
    private String className;
    private String classExplanation;
    private String level;
    private String longtime;
    private Date startDate;
    private Date lastDate;
    private String weekdays;
    private String address;
    private String detailAddress;
    private String curriculum;
    private int price;
    private float totalRating;
    private int totalLike;

    private String categoryName;
    private String managerName;
    private String managerPhone;
    private String mainImage;
    private Long categoryId;
    private String managerEmail;
    private int reserveCount;

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
                .detailAddress(this.detailAddress)
                .curriculum(this.curriculum)
                .price(this.price)
                .totalRating(this.totalRating)
                .totalLike(this.totalLike)
                .managerEmail(this.managerEmail)
                .categoryName(this.categoryName)
                .category(category)
                .manager(manager)
                .build();
    }

}
