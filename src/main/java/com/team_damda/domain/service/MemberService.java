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
                .build();

        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);
    }

        public Member updatePhoneNumber(LoginType loginType, String snsId, String phone) {
            Member member = memberRepository.getByLoginTypeAndSnsId(loginType, snsId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));
            member.setPhone(phone);
            return memberRepository.save(member);
        }
    
}
