package com.team_damda.domain.repository;

import com.team_damda.domain.entity.ClassTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassTimeRepository extends JpaRepository<ClassTime, Long> {
}
