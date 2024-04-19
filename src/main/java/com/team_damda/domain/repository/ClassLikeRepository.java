package com.team_damda.domain.repository;

import com.team_damda.domain.entity.ClassLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassLikeRepository extends JpaRepository<ClassLike,Long> {
    ClassLike findByMemberIdAndOnedayClassId(Long memberId, Long classId);

    void deleteByMemberIdAndOnedayClassId(Long memberId, Long classId);
}
