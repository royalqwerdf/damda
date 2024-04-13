package com.team_damda.domain.repository;

import org.springframework.stereotype.Repository;
import com.team_damda.domain.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


    @Repository
    public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

        List<OrderDetail> findByClassReservation_Id(Long classReservationId);

        //void deleteOrderDetail(long OrderDetailId);

        // 엔티티를 수정하기 위해 save 메서드 사용(Update가 아니라 save사용)
        //OrderDetail save(OrderDetail updatedOrderDetail);

    }
