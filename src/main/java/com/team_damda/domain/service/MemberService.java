package com.team_damda.domain.service;

import com.team_damda.domain.dto.MemberSignupDto;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void signUp(MemberSignupDto memberSignupDto) throws Exception {
        System.out.println(memberSignupDto.getName());
        System.out.println(memberSignupDto.getUserEmail());
        System.out.println(memberSignupDto.getPassword());
        System.out.println(memberSignupDto.getPhone());

        if (memberRepository.getByUserEmail(memberSignupDto.getUserEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }
        if (memberRepository.getByPhone(memberSignupDto.getPhone()).isPresent()) {
            throw new Exception("이미 존재하는 번호입니다.");
        }

        Member member = Member.builder()
                .userEmail(memberSignupDto.getUserEmail())
                .password(memberSignupDto.getPassword())
                .name(memberSignupDto.getName())
                .phone(memberSignupDto.getPhone())
                .role(Role.USER)
                .loginType(LoginType.BASIC)
                .build();

        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);
    }

//        public Member updatePhoneNumber(LoginType loginType, String snsId, String phone) {
//            Member member = memberRepository.getByLoginTypeAndSnsId(loginType, snsId)
//                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));
//            member.setPhone(phone);
//            return memberRepository.save(member);
//        }

//    public Member updatePhoneNumber(LoginType loginType, String snsId, String phone) {
//        Member member = memberRepository.getByLoginTypeAndSnsId(loginType, snsId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));
//        String newRefreshToken = jwtService.createRefreshToken();  // 새 Refresh Token 생성
//        member.setPhone(phone);
//        member.setRefreshToken(newRefreshToken);  // 새로운 Refresh Token 설정
//        return memberRepository.save(member);  // 변경 사항 저장
//    }

//    public void updateUserPhone(String userEmail, String phone) {
//        Member member = memberRepository.getByUserEmail(userEmail)
//                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
//
//        member.setPhone(phone);
//        memberRepository.save(member);
//    }

    public Member updateUserPhoneNumber(String email, String phoneNumber) {
        Member member = memberRepository.getByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        member.setPhone(phoneNumber);
        return memberRepository.save(member);
    }

}
