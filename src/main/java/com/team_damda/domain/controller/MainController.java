package com.team_damda.domain.controller;

import com.team_damda.domain.dto.CategoryDto;
import com.team_damda.domain.dto.ClassDto;
import com.team_damda.domain.entity.Inquiry;
import com.team_damda.domain.service.CategoryService;
import com.team_damda.domain.service.ClassService;
import com.team_damda.domain.service.InquiryService;
import com.team_damda.domain.service.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MainController {
    private final MainService mainService;
    private final ClassService classService;
    private final CategoryService categoryService;
    private final InquiryService inquiryService;



    @GetMapping("/home")
    public Map<String, List<?>> mainPage(){
        List<ClassDto> classes = classService.getAllClass();
        List<CategoryDto> categories = categoryService.getAllCategory();

        Map<String, List<?>> map = new HashMap<>();
        map.put("classes", classes);
        map.put("categories",categories);

        return map;
    }
    @GetMapping("/category")
    public List<CategoryDto> getCategory(){
        return categoryService.getAllCategory();
    }


    @GetMapping("/category/{categoryId}")
    public List<ClassDto> categoryClass(@PathVariable("categoryId") Long categoryId){
        return classService.getCategoryClass(categoryId);
    }

    @GetMapping("/best")
    public List<ClassDto> bestClass(){
        return classService.getBestClass();
    }

    @GetMapping("/new")
    public List<ClassDto> newClass(){
        return classService.getNewClass();
    }

    @GetMapping("/search")
    public List<ClassDto> searchClass(@RequestParam String keyword,@RequestParam String address,
                                      @RequestParam Long categoryId,@RequestParam String week,
                                      @RequestParam Long minPrice,@RequestParam Long maxPrice){
        return classService.getSearchClass(keyword,address,categoryId,week,minPrice,maxPrice);
    }
}
