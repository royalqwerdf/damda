package com.team_damda.domain.repository;

import com.team_damda.domain.entity.ClassTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassTimeRepository extends JpaRepository<ClassTime, Long> {
    public List<ClassTime> findByOnedayClassId(Long id);

}
