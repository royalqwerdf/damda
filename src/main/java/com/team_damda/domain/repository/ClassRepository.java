package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ClassRepository extends JpaRepository<Class,Long>,ClassRepositoryCustom {

    List<Class> findByCategoryId(long categoryId);
    List<Class> findTop12ByOrderByTotalRatingDescTotalLikeDesc();
    List<Class> findTop12ByOrderByIdDesc();

}
