package com.team_damda.domain.service;


import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.repository.InquiryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    @Transactional
    public Page<InquiryDto> getInquiryByOrder(PageRequest pageRequest) {
        Page<Inquiry> inquiryPage = inquiryRepository.findAllByOrderByCreatedAtDesc(pageRequest);

        return inquiryPage.map(Inquiry::toDto); // 각 Inquiry 객체를 InquiryDto로 변환
    }

    @Transactional
    public void addInquiry(Inquiry inquiry) {
        inquiryRepository.save(inquiry);

    }
}
