package com.team_damda.domain.controller;

import com.team_damda.domain.dto.EventDto;
import com.team_damda.domain.entity.Announce;
import com.team_damda.domain.entity.Event;
import com.team_damda.domain.service.AnnounceService;
import com.team_damda.domain.service.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class NewsController {

    private final AnnounceService announceService;
    private final EventService eventService;

    @GetMapping("/announce")
    public List<Announce> getAnnounce() {
        return announceService.getAnnounce();
    }
    @GetMapping("/event")
    public List<EventDto> getEvent() {
        return eventService.getEvent();
    }
    @GetMapping("/announce/{id}")
    public Announce getAnnounceById(@PathVariable Long id) {
        return announceService.getAnnounceById(id);
    }
    @GetMapping("/event/{id}")
    public EventDto getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }
}
