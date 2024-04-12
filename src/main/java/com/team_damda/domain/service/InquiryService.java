package com.team_damda.domain.service;


import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.repository.InquiryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    @Transactional
    public List<InquiryDto> getInquiryList() {
        List<Inquiry> inquiries = inquiryRepository.findAll();
        List<InquiryDto> inquiryDtoList = new ArrayList<>();

        for(Inquiry inquiry : inquiries) {
            System.out.println("Inquiry content : " + inquiry.getTitle());
            inquiryDtoList.add(inquiry.toDto());
        }
        return inquiryDtoList;


    }

    public void addInquiry(Inquiry inquiry) {
        inquiryRepository.save(inquiry);

    }
}
