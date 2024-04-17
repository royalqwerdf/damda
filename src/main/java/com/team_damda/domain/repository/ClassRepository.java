package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    List<ClassTime> findClassTimeById(Long id);

    Page<Class> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
