package com.team_damda.domain.controller;

import com.team_damda.domain.dto.MemberSignupDto;
import com.team_damda.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class MemberController {

    private final MemberService memberService;

    /**
     *
     * @param memberSignupDto
     * @return 회원가입
     * @throws Exception
     */
    @PostMapping("/signUp")
    public String signUp(@RequestBody MemberSignupDto memberSignupDto) throws Exception {
        memberService.signUp(memberSignupDto);
        return "/memberSaved";
    }



}
