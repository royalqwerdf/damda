package com.sumin.team_damda.domain.repository;

import com.sumin.team_damda.domain.entity.ClassImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassImageRepository extends JpaRepository<ClassImage,Long> {
}
