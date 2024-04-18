package com.team_damda.domain.entity;

import com.team_damda.domain.dto.ClassReviewDto;
import com.team_damda.domain.dto.ClassTimeDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="class_review")
public class ClassReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="title")
    private String title;

    @Column(name="contents")
    private String contents;

    @Column(name="rating")
    private float rating;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class onedayClass;

    @OneToMany(mappedBy = "classReview")
    @Comment("리뷰의 사진 매핑")
    private List<ReviewImage> reviewImages = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="user_id")
    private Member member;

    public ClassReviewDto toDto() {
        return ClassReviewDto.builder()
                .user_id(this.member.getId())
                .rating(this.rating)
                .title(this.title)
                .contents(this.contents)
                .build();
    }

}
