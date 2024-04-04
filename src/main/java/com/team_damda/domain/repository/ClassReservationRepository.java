package com.team_damda.domain.repository;

import com.team_damda.domain.entity.ClassReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassReservationRepository  extends JpaRepository<ClassReservation,Long> {
}
