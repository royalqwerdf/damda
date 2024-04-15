package com.team_damda.domain.controller;

import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.repository.InquiryRepository;
import com.team_damda.domain.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class InquiryController {

    private final InquiryService inquiryService;

    @GetMapping("/admin-home")
    public Map<String, Object> getInquiryList() {
        Map<String, Object> result = new HashMap<>();
        List<InquiryDto> inquiryList = inquiryService.getInquiryList();
        result.put("inquiryList", inquiryList);
        return result;
    }

    @PostMapping("/inquiry")
    public void AddInquiry(@RequestBody Inquiry inquiry) {
        //todo: 프론트 단에서 멤버 받아서 inquiry객체에 넣어줘야 함
        inquiry.setComment_yn("n");
        inquiryService.addInquiry(inquiry);
    }

}
