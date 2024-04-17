package com.team_damda.domain.controller;

import com.team_damda.domain.dto.*;
import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.repository.CategoryRepository;
import com.team_damda.domain.repository.ClassRepository;
import com.team_damda.domain.repository.MemberRepository;
import com.team_damda.domain.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequiredArgsConstructor
@RestController
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


    @PostMapping("/class-open/{memberId}")
    public Long createClass(@RequestBody RequestData requestData, @PathVariable Long memberId) {

        ClassDto classDto = requestData.getClassDto();
        List<ClassTimeDto> classTimeDtos = requestData.getClassTimeDtos();
        List<ClassImageDto> classImageDtos = requestData.getClassImageDtos();


        return classOpenService.saveForClass(memberId, classDto, classTimeDtos, classImageDtos);
    }

    @GetMapping("/admin-home/class")
    public Map<String, Object> getClassList(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<ClassDto> classPage = classOpenService.getClassByOrder(pageRequest);

        Map<String, Object> result = new HashMap<>();
        result.put("classList", classPage.getContent());
        result.put("totalPages", classPage.getTotalPages());
        result.put("totalElements", classPage.getTotalElements());

        return result;
    }

    @PostMapping("/admin-home/class")
    public ResponseEntity<Map<String, Object>> getClassSetting(@RequestBody ClassRequest request) {
        String category = request.getCategory();
        String classId = request.getClassId();
        String searching = request.getSearching();
        Date startDay = request.getStartDay();
        Date endDay = request.getEndDay();

        List<Class> sortClasses = classOpenService.sortClass(category, classId, searching, startDay, endDay);

        int pageSize = 10;
        Page<Class> sortedPage = new PageImpl<>(sortClasses, PageRequest.of(0, pageSize), sortClasses.size());
        Page<ClassDto> sortedDtoPage = sortedPage.map(Class::toDto);

        Map<String, Object> result = new HashMap<>();
        result.put("classList", sortedDtoPage.getContent());
        result.put("totalPages", sortedDtoPage.getTotalPages());
        result.put("totalElements", sortedDtoPage.getTotalElements());

        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/admin-home/class_delete/{classId}")
    public void deleteClass(@PathVariable Long classId) {
        classOpenService.deleteClassAndRelations(classId);
    }

}
