package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassReservation;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ClassReservationRepositoryCustom {

    List<ClassReservation> searchReservationByEmail(String category, String searching, Date startDay, Date endDay);
    List<ClassReservation> searchReservationByClassName(String category, String searching, Date startDay, Date endDay);
}
