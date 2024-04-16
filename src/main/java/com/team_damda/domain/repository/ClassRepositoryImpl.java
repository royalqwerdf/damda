package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ClassRepositoryImpl implements ClassRepositoryCustom{

    private final EntityManager em;
    @Override
    public List<Class> searchClass(String keyword, String address, Long categoryId,
                                   String week, Long minPrice, Long maxPrice){


        String searchSql = " select c from Class c where 1=1 ";

        if(keyword!=null&& !keyword.isEmpty()){
            searchSql += " and (c.curriculum like '%" + keyword + "%' or c.className like '%" + keyword + "%' or c.classExplanation like '%" + keyword + "%') ";
        }
        if(address!=null&& !address.isEmpty()){
            searchSql += " and c.address like '%" + address + "%' ";
        }
        if(categoryId!=null&&categoryId!=0){
            searchSql += " and c.category.id = " + categoryId + " ";
        }
        if(week!=null&& !week.isEmpty()){
            if(week.equals("평일")){
                searchSql += " and (c.weekdays like '%월%' or c.weekdays like '%화%' or c.weekdays like '%수%' or c.weekdays like '%목%' or c.weekdays like '%금%') ";
            }
            else if(week.equals("주말")){
                searchSql += " and (c.weekdays like '%토%' or c.weekdays like '%일%') ";
            }
        }
        if(minPrice!=null&&minPrice!=0){
            searchSql += " and c.price >= " + minPrice + " ";
        }
        if(maxPrice!=null&&maxPrice!=0){
            searchSql += " and c.price <= " + maxPrice + " ";
        }
        System.out.println(searchSql);
        TypedQuery<Class> list =
                em.createQuery(searchSql, Class.class);

        return list.getResultList();
    }
}
