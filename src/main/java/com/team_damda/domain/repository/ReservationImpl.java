package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassReservation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class ReservationImpl implements ClassReservationRepositoryCustom {

    private final EntityManager em;

    @Override
    public List<ClassReservation> searchReservationByEmail(String category, String searching, Date startDay, Date endDay) {
        String searchSql = "SELECT c FROM ClassReservation c WHERE 1=1 ";

        // 카테고리가 주어진 경우
        if (category != null && !category.isEmpty()) {
            searchSql += "AND c.classType = :category ";
        }

        // 이메일 검색이 주어진 경우
        if (searching != null && !searching.isEmpty()) {
            searchSql += "AND c.userEmail LIKE :searching ";
        }

        TypedQuery<ClassReservation> query = em.createQuery(searchSql, ClassReservation.class);

        // 바인딩 변수 설정
        if (category != null && !category.isEmpty()) {
            query.setParameter("category", category);
        }
        if (searching != null && !searching.isEmpty()) {
            query.setParameter("searching", "%" + searching + "%");
        }

        return query.getResultList();
    }

    @Override
    public List<ClassReservation> searchReservationByClassName(String category, String searching, Date startDay, Date endDay) {
        String searchSql = "SELECT c FROM ClassReservation c WHERE 1=1 ";

        // 카테고리가 주어진 경우
        if (category != null && !category.isEmpty()) {
            searchSql += "AND c.classType = :category ";
        }

        // 클래스명 검색이 주어진 경우
        if (searching != null && !searching.isEmpty()) {
            searchSql += "AND c.className LIKE :searching ";
        }

        TypedQuery<ClassReservation> query = em.createQuery(searchSql, ClassReservation.class);

        // 바인딩 변수 설정
        if (category != null && !category.isEmpty()) {
            query.setParameter("category", category);
        }
        if (searching != null && !searching.isEmpty()) {
            query.setParameter("searching", "%" + searching + "%");
        }

        return query.getResultList();
    }
}
