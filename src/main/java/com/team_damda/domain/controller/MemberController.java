package com.team_damda.domain.controller;

import com.team_damda.domain.dto.MemberPhoneUpdateRequest;
import com.team_damda.domain.dto.MemberSignupDto;
import com.team_damda.domain.service.LoginService;
import com.team_damda.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;
    private final LoginService loginService;

    /**
     *
     * @param memberSignupDto
     * @return 회원가입
     * @throws Exception
     */
    @PostMapping("/signup")
    public String signUp(@RequestBody MemberSignupDto memberSignupDto) throws Exception {
        memberService.signUp(memberSignupDto);
        return "redirect:/memberSaved";
    }

    @PostMapping("/Oauth2Signup")
    public ResponseEntity<?> updatePhoneNumber(@RequestBody MemberPhoneUpdateRequest request) {
        memberService.updatePhoneNumber(request.getId(), request.getPhone());
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/login")
//    public void login(@RequestBody LoginDto loginDto) throws Exception {
//        loginService.loadUserByUsername(loginDto);
//        return "/home";
//    }

}
