package com.team_damda.domain.service;

import com.team_damda.domain.dto.CategoryDto;
import com.team_damda.domain.dto.MemberDto;
import com.team_damda.domain.entity.Category;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.AdminMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminMemberService {
    private final AdminMemberRepository adminMemberRepository;
    private final PasswordEncoder passwordEncoder;

    public List<MemberDto> getAllCategory(){
        List<Member> allMembers = adminMemberRepository.findAll();
        List<MemberDto> allMemberDtos = new ArrayList<>();
        for(Member member: allMembers){
            MemberDto memberDto = member.toDto();
            allMemberDtos.add(memberDto);
        }
        return allMemberDtos;
    }

    public boolean deleteMember(Long memberId) {
        boolean isDeleted = false;
        Member member = adminMemberRepository.findById(memberId).orElse(null);
        if(member != null) {
            adminMemberRepository.delete(member);
            isDeleted = true;
        }
        return isDeleted;
    }

    public boolean updateMember(Long memberId, String userEmail, String password, String name, String phone) {
        boolean isUpdated = false;
        Member member = adminMemberRepository.findById(memberId).orElse(null);
        if(member != null) {
            member.setUserEmail(userEmail);
            member.setPassword(password);
            member.passwordEncode(passwordEncoder);
            member.setName(name);
            member.setPhone(phone);
            isUpdated = true;
        }
        return isUpdated;
    }

    public List<Member> findMembersByUserEmail(String userEmail) {
        return adminMemberRepository.findMembersByUserEmail(userEmail);
    }

    public List<Member> findMembersByName(String name) {
        return adminMemberRepository.findMembersByName(name);
    }
}
