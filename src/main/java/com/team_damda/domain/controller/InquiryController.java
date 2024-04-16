package com.team_damda.domain.controller;

import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.dto.InquiryRequest;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.InquiryRepository;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.InquiryService;
import com.team_damda.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequiredArgsConstructor
@RestController
public class InquiryController {

    private final InquiryService inquiryService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @GetMapping("/admin-home")
    public Map<String, Object> getInquiryList(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<InquiryDto> inquiryPage = inquiryService.getInquiryByOrder(pageRequest);

        Map<String, Object> result = new HashMap<>();
        result.put("inquiryList", inquiryPage.getContent());
        result.put("totalPages", inquiryPage.getTotalPages());
        result.put("totalElements", inquiryPage.getTotalElements());

        return result;
    }
    @GetMapping("/inquiry/{memberId}")
    public List<InquiryDto> getInquiry(@PathVariable("memberId") Long memberId) {
        List<InquiryDto> inquiryDtos = new ArrayList<>();
        List<Inquiry> inquiry = inquiryService.getInquiry(memberId);
        for (Inquiry i : inquiry) {
            InquiryDto inquiryDto = i.toDto();
            inquiryDtos.add(inquiryDto);
        }
        return inquiryDtos;
    }

    @PostMapping("/inquiry/{memberId}")
    public void AddInquiry(@RequestBody Inquiry inquiry,@PathVariable Long memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);
        inquiry.setMember(member);
        inquiry.setComment_yn("n");
        inquiry.setUserEmail(member.getUserEmail());
        inquiry.setMemberRole(member.getRole().getKey());
        inquiryService.addInquiry(inquiry);
    }

    @PostMapping("/admin-home")
    public void getInquirySetting(@RequestBody InquiryRequest request){
        String classify = request.getClassify();
        String userId = request.getUserId();
        String selectedUser = request.getSelectedUser();
        String searchContent = request.getSearchContent();
        Date startDay = request.getStartDay();
        Date endDay = request.getEndDay();

        inquiryService.sortInquiry(classify, userId, selectedUser, searchContent, startDay, endDay);
    }

}
