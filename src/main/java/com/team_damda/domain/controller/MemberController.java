package com.team_damda.domain.controller;

import com.team_damda.domain.dto.MemberPhoneUpdateRequest;
import com.team_damda.domain.dto.MemberSignupDto;
import com.team_damda.domain.dto.UserInformationDTO;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.service.JwtService;
import com.team_damda.domain.service.LoginService;
import com.team_damda.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;
    private final JwtService jwtService;


    /**
     *
     * @param memberSignupDto
     * @return 회원가입
     * @throws Exception
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody MemberSignupDto memberSignupDto) throws Exception {
        Member member = memberService.signUp(memberSignupDto);
        if (member != null) {
            return ResponseEntity.ok(Collections.singletonMap("name", member.getName()));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
        }
    }


    @PostMapping("/Oauth2Signup")
    public ResponseEntity<?> oauth2Signup(@CookieValue(name = "accessToken", required = false) String accessToken, @RequestBody MemberPhoneUpdateRequest request) {
        if (accessToken == null) {
            log.error("쿠키에서 액세스 토큰 추출 실패");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "인증 실패"));
        }

        // 토큰 유효성 검증 및 이메일 추출
        String userEmail = jwtService.extractEmail(accessToken).orElse(null);
        if (userEmail == null) {
            log.error("토큰에서 이메일 추출 실패");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "인증 실패"));
        }

        log.info("핸드폰 번호 업데이트 요청: email={}, phone={}", userEmail, request.getPhone());
        try {
            // 서버의 Oauth2Signup 메서드 수정 예시
            Member updatedMember = memberService.updateUserPhoneNumber(userEmail, request.getPhone());
            return ResponseEntity.ok(Map.of("name", updatedMember.getName(), "message", "핸드폰 번호가 업데이트 되었습니다: " + updatedMember.getUserEmail()));
        } catch (Exception e) {
            log.error("사용자 업데이트 중 오류 발생: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "사용자 업데이트 오류"));
        }
    }

    @GetMapping("/member/{email}")
    public UserInformationDTO getMemberId(@PathVariable("email") String email) {

        Member member = memberService.getMember(email);
        return UserInformationDTO.fromEntity(member);
    }


}
