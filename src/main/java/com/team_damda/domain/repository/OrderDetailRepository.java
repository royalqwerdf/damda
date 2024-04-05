package com.team_damda.domain.repository;

import org.springframework.stereotype.Repository;
import com.team_damda.domain.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


    @Repository
    public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
        void deleteByorderdetailId(int OrderDetailId);

        List<OrderDetail> updateOrderDetail();

        List<OrderDetail> findByClassReservationId(Long classReservationId);

}
