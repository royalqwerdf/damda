package com.team_damda.domain.service;

import com.team_damda.domain.dto.MemberSignupDto;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
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
}
