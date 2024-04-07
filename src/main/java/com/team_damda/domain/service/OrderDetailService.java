package com.team_damda.domain.service;

import com.team_damda.domain.entity.ClassReservation;
import com.team_damda.domain.entity.OrderDetail;
import com.team_damda.domain.exception.NotFoundException;
import com.team_damda.domain.repository.ClassReservationRepository;
import com.team_damda.domain.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {
    @Autowired
    private final OrderDetailRepository orderDetailRepository;

    @Autowired
    private final ClassReservationRepository classReservationRepository;


    @Autowired
    public OrderDetailService(OrderDetailRepository orderDetailRepository, ClassReservationRepository classReservationRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.classReservationRepository = classReservationRepository;
    }

    // 예약 ID를 기반으로 주문 상세 정보 가져오기
    public List<OrderDetail> getOrderDetailsByClassReservationId(Long classReservationId) {
        return orderDetailRepository.findByClassReservationId(classReservationId);
    }

    // 예약 정보 확인하여 주문 상세 정보 수정
    public OrderDetail updateOrderDetail(Long orderDetailId, OrderDetail updatedOrderDetail) {
        // 예약 정보 조회
        Optional<ClassReservation> optionalClassReservation = classReservationRepository.findById(updatedOrderDetail.getClassReservationId());
        if (optionalClassReservation.isPresent()) {
            ClassReservation classReservation = optionalClassReservation.get();
            // 다른 사람이 예약 정보를 변경하지 않았다면 주문 상세 정보 수정
            // 여기에서는 단순히 저장만 하도록 가정합니다. 필요에 따라 실제 업데이트 로직을 구현하세요.
            return orderDetailRepository.save(updatedOrderDetail);
        } else {
            // 예약 정보가 없는 경우 예외 처리
            throw new NotFoundException("Reservation not found for reservationId: " + updatedOrderDetail.getClassReservationId());
        }
    }

    // 예약 정보 확인하여 주문 상세 정보 삭제
    public void deleteOrderDetail(Long orderDetailId) {
        // 주문 상세 정보 조회
        Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(orderDetailId);
        if (optionalOrderDetail.isPresent()) {
            OrderDetail orderDetail = optionalOrderDetail.get();
            // 예약 정보 조회
            Optional<ClassReservation> optionalReservation = classReservationRepository.findById(orderDetail.getClassReservationId());
            if (optionalReservation.isPresent()) {
                // 다른 사람이 예약 정보를 변경하지 않았다면 주문 상세 정보 삭제
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