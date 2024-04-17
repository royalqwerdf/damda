package com.team_damda.domain.controller;

import com.team_damda.domain.dto.ClassDto;
import com.team_damda.domain.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class ClassController {

    private final ClassService classService;

    @GetMapping("/member-class/{id}")
    public List<ClassDto> getMemberClass(@PathVariable Long id) {
        return classService.getMemberClass(id);
    }
}
