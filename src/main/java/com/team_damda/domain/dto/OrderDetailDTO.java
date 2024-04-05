package com.team_damda.domain.dto;

import lombok.Data;
import java.time.LocalDateTime;
@Data
public class OrderDetailDTO {
    private LocalDateTime reservationDate;
    private LocalDateTime orderDate;
    private String className;
    private long totalHeadcount;
    private long totalPrice;


}
