
package com.team_damda.domain.dto;

import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDto {
    private long id;
    private long classTimeId;
    private int selectedCount;
    private int totalPrice;
    private long user_id;
    private String cookie_value;
    private String className;
    private Date classDate;
    private long classId;

    public Cart toEntity(){
        return Cart.builder()
                .selectedCount(this.selectedCount)
                .totalPrice(this.totalPrice)
                .build();
    }
}

