package com.sumin.team_damda.domain.controller;

import com.sumin.team_damda.domain.dto.CategoryDto;
import com.sumin.team_damda.domain.dto.ClassDto;
import com.sumin.team_damda.domain.entity.Category;
import com.sumin.team_damda.domain.entity.Class;
import com.sumin.team_damda.domain.repository.CategoryRepository;
import com.sumin.team_damda.domain.repository.ClassRepository;
import com.sumin.team_damda.domain.service.CategoryService;
import com.sumin.team_damda.domain.service.ClassService;
import com.sumin.team_damda.domain.service.MainService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

@RestController
public class MainController {
    private final MainService mainService;
    private final ClassService classService;
    private final CategoryService categoryService;

    public MainController(MainService mainService,ClassService classService,CategoryService categoryService){
        this.mainService = mainService;
        this.classService = classService;
        this.categoryService = categoryService;
    }

    @GetMapping("/home")
    public Map<String, List<?>> mainPage(){
        List<ClassDto> classes = classService.getAllClass();
        List<CategoryDto> categories = categoryService.getAllCategory();

        Map<String, List<?>> map = new HashMap<>();
        map.put("classes", classes);
        map.put("categories",categories);

        return map;
    }
//    @GetMapping("/home")
//    public List<ClassDto> mainPage(){
//        return classService.getAllClass();
//    }

}
