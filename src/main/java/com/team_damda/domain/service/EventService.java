package com.team_damda.domain.service;

import com.team_damda.domain.dto.EventDto;
import com.team_damda.domain.entity.Event;
import com.team_damda.domain.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    public List<EventDto> getEvent() {
        List<Event> event = eventRepository.findAll();
        List<EventDto> eventDto = new ArrayList<>();
        for(Event e : event){
            EventDto eDto = e.toDto();
            eventDto.add(eDto);
        }
        return eventDto;
    }
}
