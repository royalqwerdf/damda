package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ClassRepository extends JpaRepository<Class,Long> {

    public List<Class> findByCategoryId(long categoryId);
    public List<Class> findTop12ByOrderByTotalRatingDescTotalLikeDesc();
    public List<Class> findTop12ByOrderByIdDesc();
}
