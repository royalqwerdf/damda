package com.team_damda.domain.dto;

import com.team_damda.domain.entity.ClassReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 전체 파라미터를 갖는 생성자 추가
public class ClassReviewDto {
    private long class_id;
    private long user_id;
    private String title;
    private String contents;
    private float rating;


    public ClassReview toEntity(){
        return ClassReview.builder()
                .title(this.title)
                .contents(this.contents)
                .rating(this.rating)
                .build();
    }
}
