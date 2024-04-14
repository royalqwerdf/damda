package com.team_damda.domain.service;

import com.team_damda.domain.entity.ClassReservation;
import com.team_damda.domain.entity.OrderDetail;
import com.team_damda.domain.exception.NotFoundException;
import com.team_damda.domain.repository.ClassReservationRepository;
import com.team_damda.domain.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


//import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {
    @Autowired
    private final OrderDetailRepository orderDetailRepository;

    @Autowired
    private final ClassReservationRepository classReservationRepository;

    public void deleteOrderDetailById(Long orderDetailId) {
        orderDetailRepository.deleteById(orderDetailId);
    }

    @Autowired
    public OrderDetailService(OrderDetailRepository orderDetailRepository, ClassReservationRepository classReservationRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.classReservationRepository = classReservationRepository;
    }

    public Page<OrderDetail> findAll(Pageable pageable) {
        return orderDetailRepository.findAll(pageable);
    }

    //페이지 구현
    public Page<OrderDetail> getOrderDetailList(Pageable pageable){
        pageable = PageRequest.of(pageable.getPageNumber() <= 0 ? 0 : pageable.getPageNumber()-1,
                pageable.getPageSize());
        return orderDetailRepository.findAll(pageable);
    }

    // 예약 ID로 주문 상세 정보 가져오기
    public List<OrderDetail> getOrderDetailByClassReservationId(Long classReservationId) {
        return orderDetailRepository.findByClassReservation_Id(classReservationId);
    }

    // 예약 정보 확인하여 주문 상세 정보 수정
    public OrderDetail updateOrderDetail(Long orderDetailId, OrderDetail updatedOrderDetail) {
        // 예약 정보 조회
        Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(orderDetailId);
        if (optionalOrderDetail.isPresent()) {
            OrderDetail orderDetail = optionalOrderDetail.get();

            orderDetail.setReservationDate(updatedOrderDetail.getReservationDate());
            orderDetail.setOrderDate(updatedOrderDetail.getOrderDate());
            orderDetail.setClassName(updatedOrderDetail.getClassName());
            orderDetail.setTotalHeadcount(updatedOrderDetail.getTotalHeadcount());
            orderDetail.setTotalPrice(updatedOrderDetail.getTotalPrice());

            //저장
            return orderDetailRepository.save(orderDetail);
        } else {
            // 예약 정보가 없는 경우 예외 처리
            throw new NotFoundException("OrderDetail not found for orderDetailId: " + orderDetailId);
        }
    }

    //주문상세 삭제 (예약에서 구현할것인가?)
    public void deleteOrderDetail(Long orderDetailId) {
        // 주문 상세 정보 조회
        Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(orderDetailId);
        if (optionalOrderDetail.isPresent()) {
            OrderDetail orderDetail = optionalOrderDetail.get();
            // 예약 정보 조회
            Optional<ClassReservation> optionalReservation = classReservationRepository.findById(orderDetail.getClassReservationId());
            if (optionalReservation.isPresent()) {
                // 다른 사람이 예약 정보를 변경하지 않았다면 주문 상세 정보 삭제 (?)
                orderDetailRepository.deleteById(orderDetailId);
            } else {
                // 예약 정보가 없는 경우 예외 처리
                throw new NotFoundException("Reservation not found for reservationId: " + orderDetail.getClassReservationId());
            }
        } else {
            // 주문 상세 정보가 없는 경우 예외 처리
            throw new NotFoundException("OrderDetail not found for orderDetailId: " + orderDetailId);
        }
    }



}
