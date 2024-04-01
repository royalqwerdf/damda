package com.sumin.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="review_image")
@Builder
public class ReviewImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="review_image_url")
    private String imageUrl;

    @Column(name="review_file_name")
    private String fileName;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="class_review_id")
    private ClassReview classReview;
}
