package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Class;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ClassRepositoryCustom {
    List<Class> searchClass(String keyword, String address, Long categoryId,
                            String week, Long minPrice, Long maxPrice);

    List<Class> searchClassByEmail(String category, String searching, Date startDay, Date endDay);
    List<Class> searchClassByClassName(String category, String searching, Date startDay, Date endDay);
}
