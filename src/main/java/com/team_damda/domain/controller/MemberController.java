package com.team_damda.domain.controller;

import com.team_damda.domain.dto.MemberPhoneUpdateRequest;
import com.team_damda.domain.dto.MemberSignupDto;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.service.LoginService;
import com.team_damda.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
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
        // updatePhoneNumber 메서드를 호출할 때 LoginType과 snsId를 전달합니다.
        memberService.updatePhoneNumber(request.getLoginType(), request.getSnsId(), request.getPhone());
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/Oauth2Signup")
//    public ResponseEntity<?> updatePhoneNumber(@RequestBody MemberPhoneUpdateRequest request) {
//        log.info("Received update request with phone: {}, loginType: {}, snsId: {}", request.getPhone(), request.getLoginType(), request.getSnsId());
//        if (request.getPhone() == null || request.getLoginType() == null || request.getSnsId() == null) {
//            return ResponseEntity.badRequest().body("필수 필드가 누락되었습니다.");
//        }
//        memberService.updatePhoneNumber(request.getLoginType(), request.getSnsId(), request.getPhone());
//        return ResponseEntity.ok().build();
//    }


}
