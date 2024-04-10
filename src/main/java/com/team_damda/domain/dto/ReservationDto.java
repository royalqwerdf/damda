package com.team_damda.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {
    private long id;
    private String className;
    private String classExplanation;
    private int headcount;
    private String address;
    private String curriculum;
    private int price;
    private float totalRating;
    private int totalLike;
}
