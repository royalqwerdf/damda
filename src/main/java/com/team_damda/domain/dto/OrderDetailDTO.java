package com.team_damda.domain.dto;

import com.team_damda.domain.entity.OrderDetail;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrderDetailDTO {
    private long id;
    private LocalDateTime reservationDate;
    private LocalDateTime orderDate;
    private String className;
    private long totalHeadcount;
    private long totalPrice;

    public static OrderDetailDTO fromEntity(OrderDetail orderDetail) {
        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        orderDetailDTO.setId(orderDetail.getId());
        orderDetailDTO.setReservationDate(orderDetail.getReservationDate());
        orderDetailDTO.setOrderDate(orderDetail.getOrderDate());
        orderDetailDTO.setClassName(orderDetail.getClassName());
        orderDetailDTO.setTotalHeadcount(orderDetail.getTotalHeadcount());
        orderDetailDTO.setTotalPrice(orderDetail.getTotalPrice());


        return orderDetailDTO;
    }
}
