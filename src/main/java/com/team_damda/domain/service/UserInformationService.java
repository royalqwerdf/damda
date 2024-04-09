package com.team_damda.domain.service;

import com.team_damda.domain.dto.UserInformationDTO;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInformationService {

    private final MemberRepository memberRepository;

    @Autowired
    public UserInformationService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // 사용자 정보를 가져오는 메서드
    public UserInformationDTO getUserInformation(Long userId) {
        // MemberRepository를 사용하여 사용자 정보를 조회하고, 결과를 가져옵니다.
        Member member = memberRepository.findById(userId).orElse(null);

        // 사용자 정보가 없는 경우 null을 반환합니다.
        if (member == null) {
            return null;
        }

        // 사용자 정보가 있는 경우, UserInformationDTO로 변환하여 반환합니다.
        return UserInformationDTO.fromEntity(member);
    }

}
