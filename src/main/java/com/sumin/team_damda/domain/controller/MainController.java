package com.sumin.team_damda.domain.controller;

import com.sumin.team_damda.domain.dto.ClassDto;
import com.sumin.team_damda.domain.entity.Category;
import com.sumin.team_damda.domain.entity.Class;
import com.sumin.team_damda.domain.repository.CategoryRepository;
import com.sumin.team_damda.domain.repository.ClassRepository;
import com.sumin.team_damda.domain.service.MainService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class MainController {
    private final MainService mainService;
    private final ClassRepository classRepository;
    private final CategoryRepository categoryRepository;

    public MainController(MainService mainService,ClassRepository classRepository,CategoryRepository categoryRepository){
        this.mainService = mainService;
        this.classRepository = classRepository;
        this.categoryRepository = categoryRepository;
    }

//    @GetMapping("/home")
//    public Map<String, List<?>> mainPage(){
//        List<Class> classes = classRepository.findAll();
//        List<Category> categories = categoryRepository.findAll();
//
//        Map<String, List<?>> map = new HashMap<>();
//        map.put("classes", classes);
//        map.put("categories",categories);
//
//        return map;
//    }
    @GetMapping("/home")
    public ClassDto mainPage(){
        Class ondayClass = classRepository.findById(1L).orElse(null);
        ClassDto classDto = ondayClass.toDto();
        return classDto;
    }
}
