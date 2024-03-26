package com.sumin.team_damda.domain.dto;

import com.sumin.team_damda.domain.entity.Category;
import com.sumin.team_damda.domain.entity.Member;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.util.Map;

@Data
public class ClassDto {

    private Long id;
    private String className;
    private String location;
    private String classExplanation;
    private String contact;
    private String mainImage;
    private int likeCount;
    private float rating;
    private int price;
    private int headcount;
    private String time;
    private String manager;
    private String category;

}
