package com.team_damda.domain.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class InquiryRequest {
    private String classify;
    private String userId;
    private String selectedUser;
    private String searchContent;
    private Date startDay;
    private Date endDay;
}
