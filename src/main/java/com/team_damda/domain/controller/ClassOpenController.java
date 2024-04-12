<<<<<<< HEAD
package com.team_damda.domain.controller;

import com.team_damda.domain.dto.ClassDto;
import com.team_damda.domain.dto.ClassImageDto;
import com.team_damda.domain.dto.ClassTimeDto;
import com.team_damda.domain.dto.RequestData;
import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.repository.CategoryRepository;
import com.team_damda.domain.repository.ClassRepository;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class ClassOpenController {

    private final ClassService classOpenService;
    private final ClassRepository classRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;

    @GetMapping("/class-open")
    public ResponseEntity<List<String>> getCategoryNames() {
        List<String> categoryNames = new ArrayList<>();
        List<Category> categories = categoryRepository.findAll();

        for (Category category : categories) {
            categoryNames.add(category.getCategoryName());
            System.out.println("카테고리-Category: " + category.getCategoryName());
        }

        return ResponseEntity.ok().body(categoryNames);
    }


    @PostMapping("/class-open")
    public Long createClass(@RequestBody RequestData requestData) {

        Long memberId = 1L;
        ClassDto classDto = requestData.getClassDto();
        List<ClassTimeDto> classTimeDtos = requestData.getClassTimeDtos();
        List<ClassImageDto> classImageDtos = requestData.getClassImageDtos();


        return classOpenService.saveForClass(memberId, classDto, classTimeDtos, classImageDtos);
    }

}
