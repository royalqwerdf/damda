package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.enums.Role;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface InquiryRepositoryCustom {
    List<Inquiry> searchInquiryByEmail(String classify, String user, String searchContent, Date startDay, Date endDay);

}
