package com.sumin.team_damda.domain.entity;


import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.Map;


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
    @Column(name="location")
    private String location;
    @Column(name="class_explanation")
    private String classExplanation;
    @Column(name="search_keywords")
    private String searchKeywords;
    @Column(name="contact")
    private String contact;
    @Column(name="main_image")
    private String mainImage;
    @Column(name="like_count")
    private int likeCount;
    @Column(name="rating")
    private float rating;
    @Column(name="price")
    private int price;
    @Column(name="headcount")
    private int headcount;
    @Column(name="time_of_day")
    private String time;

    @ManyToOne
    @JoinColumn(name="manager_id")
    private Member manager;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;



}
