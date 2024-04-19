package com.team_damda.domain.repository;

import com.team_damda.domain.dto.ClassReviewDto;
import com.team_damda.domain.entity.ClassReservation;
import com.team_damda.domain.entity.ClassReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface
ClassReviewRepository  extends JpaRepository<ClassReview,Long> {
    List<ClassReview> findByOnedayClassId(Long classId);
    int countByOnedayClassId(Long classId);
    List<ClassReview> findByMember_id(Long memberId);

}
