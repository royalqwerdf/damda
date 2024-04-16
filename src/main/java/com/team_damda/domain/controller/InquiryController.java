package com.team_damda.domain.controller;

import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.dto.InquiryRequest;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.repository.InquiryRepository;
import com.team_damda.domain.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class InquiryController {

    private final InquiryService inquiryService;

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

    @PostMapping("/inquiry")
    public void AddInquiry(@RequestBody Inquiry inquiry) {
        //todo: 프론트 단에서 멤버 받아서 inquiry객체에 넣어줘야 함
        inquiry.setComment_yn("n");
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
