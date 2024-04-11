package com.team_damda.domain.service;

import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.repository.InquiryRepository;
import org.springframework.stereotype.Service;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    public void addInquiry(Inquiry inquiry) {
        inquiryRepository.save(inquiry);
    }
}
