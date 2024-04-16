
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

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartDto {
    private long classTimeId;
    private int selectedCount;
    private int totalPrice;
    private Long classTimeId;

    public Cart toEntity(){
        return Cart.builder()
                .selectedCount(this.selectedCount)
                .totalPrice(this.totalPrice)
                .build();
    }
}

