package com.team_damda.domain.service;

import com.team_damda.domain.dto.CategoryDto;
import com.team_damda.domain.dto.MemberDto;
import com.team_damda.domain.entity.Category;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.AdminMemberRepository;
import com.team_damda.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminMemberService {
    private final AdminMemberRepository adminMemberRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public List<MemberDto> getAllMembers(){
        List<Member> allMembers = memberRepository.findAll();
        List<MemberDto> allMemberDtos = new ArrayList<>();
        for(Member member: allMembers){
            MemberDto memberDto = member.toDto();
            allMemberDtos.add(memberDto);
        }
        return allMemberDtos;
    }

    public MemberDto getMember(Long memberId) {
        MemberDto memberDto = memberRepository.findById(memberId).get().toDto();
        return memberDto;
    }

    public boolean deleteMember(Long memberId) {
        boolean isDeleted = false;
        Member member = memberRepository.findById(memberId).orElse(null);
        if(member != null) {
            memberRepository.delete(member);
            isDeleted = true;
        }
        return isDeleted;
    }

    public boolean updateMember(Long memberId, String userEmail, String password, String name, String phone) {
        boolean isUpdated = false;
        Member member = memberRepository.findById(memberId).orElse(null);
        if(member != null) {
            if(userEmail != null)
                member.setUserEmail(userEmail);
            if(password != null)
                member.setPassword(passwordEncoder.encode(password));
            if(name != null)
                member.setName(name);
            if(phone != null)
                member.setPhone(phone);
            memberRepository.save(member);
            isUpdated = true;
        }
        return isUpdated;
    }

    public List<MemberDto> findMembersByUserEmail(String userEmail) {
        List<Member> members = adminMemberRepository.findMembersByUserEmail(userEmail);
        List<MemberDto> memberDtos = new ArrayList<>();
        for(Member member: members) {
            MemberDto memberDto = member.toDto();
            memberDtos.add(memberDto);
        }

        return memberDtos;
    }

    public List<MemberDto> findMembersByName(String name) {
        List<Member> members = adminMemberRepository.findMembersByName(name);
        List<MemberDto> memberDtos = new ArrayList<>();
        for(Member member: members) {
            MemberDto memberDto = member.toDto();
            memberDtos.add(memberDto);
        }

        return memberDtos;
    }
}
