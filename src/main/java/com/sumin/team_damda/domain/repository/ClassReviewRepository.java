package com.sumin.team_damda.domain.repository;

import com.sumin.team_damda.domain.entity.ClassReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassReviewRepository  extends JpaRepository<ClassReview,Long> {
}
