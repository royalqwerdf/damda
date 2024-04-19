package com.team_damda.domain.controller;

import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.dto.InquiryRequest;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.repository.InquiryRepository;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.InquiryService;
import com.team_damda.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
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
    private final InquiryRepository inquiryRepository;


    @GetMapping("/admin-home/inquiry")
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


    @PostMapping("/inquiry/{memberId}")
    public void AddInquiry(@RequestBody Inquiry inquiry,@PathVariable Long memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);
        inquiry.setMember(member);
        inquiry.setComment_yn("n");
        inquiry.setUserEmail(member.getUserEmail());
        if(member.getRole() == Role.USER) {
            inquiry.setUser_role("일반");
        } else if(member.getRole() == Role.MANAGER) {
            inquiry.setUser_role("호스트");
        }

        inquiryService.addInquiry(inquiry);
    }


    @PostMapping("/admin-home/inquiry")
    public ResponseEntity<Map<String, Object>> getInquirySetting(@RequestBody InquiryRequest request){
        String classify = request.getClassify();
        String userId = request.getUserId();
        String selectedUser = request.getSelectedUser();
        String searchContent = request.getSearchContent();
        Date startDay = request.getStartDay();
        Date endDay = request.getEndDay();

        System.out.println("Start Day: " + startDay);
        System.out.println("End Day: " + endDay);

        List<Inquiry> sortInquiries = inquiryService.sortInquiry(classify, userId, selectedUser, searchContent, startDay, endDay);

        int pageSize = 10; // 페이지당 아이템 수를 설정할 수 있습니다. 원하는 값으로 변경하세요.
        Page<Inquiry> sortedPage = new PageImpl<>(sortInquiries, PageRequest.of(0, pageSize), sortInquiries.size());
        Page<InquiryDto> sotredDtoPage = sortedPage.map(Inquiry::toDto);

        Map<String, Object> result = new HashMap<>();
        result.put("inquiryList", sotredDtoPage.getContent());
        result.put("totalPages", sotredDtoPage.getTotalPages());
        result.put("totalElements", sotredDtoPage.getTotalElements());

        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/inquiry/{memberId}")
    public List<InquiryDto> getInquiryList(@PathVariable Long memberId) {
        return inquiryService.getInquiry(memberId);
    }

    @GetMapping("/admin-home/inquiry/{inquiryId}")
    public ResponseEntity<InquiryDto> getInquiryItem(@PathVariable("inquiryId") Long inquiryId) {
        Inquiry inquiry = inquiryRepository.findInquiryById(inquiryId);
        InquiryDto inquiryDto = inquiry.toDto();

        return ResponseEntity.ok().body(inquiryDto);
    }

    @GetMapping("/inquiry/detail/{id}")
    public InquiryDto getInquiryDetail(@PathVariable("id") Long inquiryId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId).orElse(null);
        InquiryDto inquiryDto = inquiry.toDto();

        return inquiryDto;
    }

    @PutMapping("/admin-home/inquiry/{inquiryId}")
    public void setInquiryReply(@RequestBody InquiryDto dto, @PathVariable Long inquiryId) {
        Inquiry inquiry = inquiryRepository.findInquiryById(inquiryId);
        inquiryService.setReply(inquiry, dto);
    }

}
