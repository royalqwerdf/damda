package com.team_damda.domain.repository;

import com.team_damda.domain.entity.ClassReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassReservationRepository  extends JpaRepository<ClassReservation,Long> {
    List<ClassReservation> findByMember_Id(Long memberId);
    List<ClassReservation> findByMemberIdAndOnedayClassId(Long memberId, Long classId);
}
