package com.team_damda.domain.service;

import com.team_damda.domain.dto.AnnounceDto;
import com.team_damda.domain.entity.Announce;
import com.team_damda.domain.repository.AnnounceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnounceService {
    private final AnnounceRepository announceRepository;

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

}
