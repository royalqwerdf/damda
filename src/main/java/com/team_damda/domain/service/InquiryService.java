package com.team_damda.domain.service;


import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.repository.InquiryRepository;
import com.team_damda.domain.repository.InquiryRepositoryImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.team_damda.domain.enums.Role.MANAGER;
import static com.team_damda.domain.enums.Role.USER;


@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final InquiryRepositoryImpl inquiryRepositoryImpl;

    @Transactional
    public Page<InquiryDto> getInquiryByOrder(PageRequest pageRequest) {
        Page<Inquiry> inquiryPage = inquiryRepository.findAllByOrderByCreatedAtDesc(pageRequest);

        return inquiryPage.map(Inquiry::toDto); // 각 Inquiry 객체를 InquiryDto로 변환
    }

    @Transactional
    public void addInquiry(Inquiry inquiry) {
        inquiryRepository.save(inquiry);
    }

    @Transactional
    public Page<InquiryDto> sortInquiry(String c, String u, String sl, String sr, Date sday, Date eday, PageRequest pageRequest) {
        List<Inquiry> searchInquiries = new ArrayList<>();

        if(u.equals("아이디")) {
            if(sl.equals("전체")) {
                searchInquiries = inquiryRepositoryImpl.searchAllInquiryByEmail(c, sr, sday, eday);
            } else if(sl.equals("일반")) {
                searchInquiries = inquiryRepositoryImpl.searchInquiryByEmail(c, u, sr, sday, eday);
            } else if(sl.equals("호스트")) {
                searchInquiries = inquiryRepositoryImpl.searchInquiryByEmail(c, u, sr, sday, eday);
            }
        } else if(u.equals("제목")) {
            if(sl.equals("전체")) {
                searchInquiries = inquiryRepositoryImpl.searchAllInquiryByTitle(c, sr, sday, eday);
            } else if(sl.equals("일반")) {
                searchInquiries = inquiryRepositoryImpl.searchInquiryByTitle(c, u, sr, sday, eday);
            } else if(sl.equals("호스트")) {
                searchInquiries = inquiryRepositoryImpl.searchInquiryByTitle(c, u, sr, sday, eday);
            }
        }

        Page<Inquiry> inquiryPage = inquiryRepository.findAllByOrderByCreatedAtDesc(pageRequest);

        List<Inquiry> commonInquiries = searchInquiries.stream()
                .filter(inquiryPage.getContent()::contains)
                .collect(Collectors.toList());

        List<InquiryDto> inquiryDtos = new ArrayList<>();
        for(Inquiry inquiry : commonInquiries) {
            InquiryDto dto = inquiry.toDto(); // Inquiry를 InquiryDto로 변환하는 메서드 호출
            inquiryDtos.add(dto);
        }

        int currentPage = pageRequest.getPageNumber();// 현재 페이지 번호
        int pageSize = pageRequest.getPageSize(); // 페이지 크기
        long totalItems = commonInquiries.size();

        return new PageImpl<>(inquiryDtos, PageRequest.of(currentPage, pageSize), totalItems);
    }

    @Transactional
    public List<Inquiry> getInquiry(Long memberId){
        return inquiryRepository.findAllByMember_Id(memberId);
    }


}
