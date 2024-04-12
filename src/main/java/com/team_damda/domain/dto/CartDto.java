package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Cart;
import com.team_damda.domain.entity.ClassTime;
import com.team_damda.domain.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {
    private int selectedCount;
    private int totalPrice;
}
