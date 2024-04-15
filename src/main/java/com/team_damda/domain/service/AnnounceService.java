package com.team_damda.domain.service;

import com.team_damda.domain.entity.Announce;
import com.team_damda.domain.repository.AnnounceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnounceService {
    private final AnnounceRepository announceRepository;

    public List<Announce> getAnnounce(){
        return announceRepository.findAll();
    }

}
