package com.team_damda.domain.controller;

import com.team_damda.domain.dto.InquiryDto;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.repository.InquiryRepository;
import com.team_damda.domain.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

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

}
