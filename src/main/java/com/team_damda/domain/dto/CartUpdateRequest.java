package com.team_damda.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartUpdateRequest {
    private int selectedCount;
    private int totalPrice;
}
