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

    // 개인정보 가져오기
    public UserInformationDTO getUserInformation(Long memberId) {
        // MemberRepository를 사용하여 사용자 정보를 조회하고, 결과를 가져옵니다.
        Member member = memberRepository.findById(memberId).orElse(null);

        // 사용자 정보가 없으면 null 리턴
        if (member == null) {
            return null;
        }

        // 사용자 정보가 있는 경우, UserInformationDTO로 변환하여 반환
        return UserInformationDTO.fromEntity(member);
    }
    /*예약수정*/
    public UserInformationDTO updateUserInformation(Long memberId, UserInformationDTO userInformationDTO) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member != null) {
            // 여기에서 UserInformationDTO의 정보로 회원 정보를 업데이트합니다.
            member.setName(userInformationDTO.getName());
            member.setPhone(userInformationDTO.getPhone());
            member.setPassword(userInformationDTO.getPassword());
            // 나머지 필요한 업데이트 로직 추가
            memberRepository.save(member);
        }
        return userInformationDTO;
    }
    public void deleteUserInformation(Long memberId) {
        // DTO에서 memberId를 가져와서 회원 정보를 삭제합니다. UserInformationDTO userInformationDTO
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member != null){
            memberRepository.deleteById(memberId);
        }

    }

}
