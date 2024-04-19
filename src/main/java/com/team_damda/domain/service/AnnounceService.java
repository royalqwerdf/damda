package com.team_damda.domain.service;

import com.team_damda.domain.dto.AnnounceDto;
import com.team_damda.domain.entity.Announce;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.AnnounceRepository;
import com.team_damda.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnounceService {
    private final AnnounceRepository announceRepository;
    private final MemberRepository memberRepository;

    public List<AnnounceDto> getAnnounce(){
        List<Announce> announceList = announceRepository.findAll();
        List<AnnounceDto> announceDtoList = new ArrayList<>();
        for (Announce announce : announceList) {
            AnnounceDto announceDto = announce.toDto();
            announceDtoList.add(announceDto);
        }
        return announceDtoList;
    }
    public AnnounceDto getAnnounceById(Long id){
        return announceRepository.findById(id).orElse(null).toDto();
    }


    /**
     * 공지사항 생성
     * @param announceDto
     * @return
     */
    public AnnounceDto createAnnouncement(AnnounceDto announceDto) {
        Member member = memberRepository.findById(announceDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));
        Announce announce = Announce.builder()
                .title(announceDto.getTitle())
                .content(announceDto.getContent())
                .member(member)
                .build();
        return announceRepository.save(announce).toDto();
    }


    /**
     * 공지상항 보내기
     * @param id
     * @return
     */
    public AnnounceDto getAnnouncementById(Long id) {
        Announce announce = announceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        return announce.toDto();
    }


    /**
     * 공지사항 수정 업로드
     * @param id
     * @param announceDto
     * @return
     */
    public AnnounceDto updateAnnouncement(Long id, AnnounceDto announceDto) {
        Announce announce = announceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        Member member = memberRepository.findById(announceDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        announce.setTitle(announceDto.getTitle());
        announce.setContent(announceDto.getContent());
        announce.setMember(member);
        return announceRepository.save(announce).toDto();
    }

    /**
     * 공지사항 삭제
     * @param id
     */
    public void deleteAnnouncement(Long id) {
        if (!announceRepository.existsById(id)) {
            throw new RuntimeException("Announcement not found");
        }
        announceRepository.deleteById(id);
    }

}
