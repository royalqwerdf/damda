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
    public List<Inquiry> sortInquiry(String c, String u, String sl, String sr, Date sday, Date eday) {
        List<Inquiry> searchInquiries = new ArrayList<>();

        if(u.equals("아이디")) {
            if(sl.equals("전체")) {
                searchInquiries = inquiryRepositoryImpl.searchAllInquiryByEmail(c, sr, sday, eday);
            } else if(sl.equals("일반")) {
                searchInquiries = inquiryRepositoryImpl.searchInquiryByEmail(c, "일반", sr, sday, eday);
            } else if(sl.equals("호스트")) {
                searchInquiries = inquiryRepositoryImpl.searchInquiryByEmail(c, "호스트", sr, sday, eday);
            }
        } else if(u.equals("제목")) {
            if(sl.equals("전체")) {
                searchInquiries = inquiryRepositoryImpl.searchAllInquiryByTitle(c, sr, sday, eday);
            } else if(sl.equals("일반")) {
                searchInquiries = inquiryRepositoryImpl.searchInquiryByTitle(c, "일반", sr, sday, eday);
            } else if(sl.equals("호스트")) {
                searchInquiries = inquiryRepositoryImpl.searchInquiryByTitle(c, "호스트", sr, sday, eday);
            }
        }
        for(Inquiry inquiry : searchInquiries) {
            System.out.println("!!!!! :" + inquiry.getTitle());
        }

        return searchInquiries;
    }

    @Transactional
    public List<Inquiry> getInquiry(Long memberId){
        return inquiryRepository.findAllByMember_Id(memberId);
    }


}
