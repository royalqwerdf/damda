package com.sumin.team_damda.domain.controller;

import com.sumin.team_damda.domain.entity.Category;
import com.sumin.team_damda.domain.entity.Class;
import com.sumin.team_damda.domain.repository.CategoryRepository;
import com.sumin.team_damda.domain.repository.ClassRepository;
import com.sumin.team_damda.domain.service.MainService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/")
public class MainController {
    private final MainService mainService;
    private final ClassRepository classRepository;
    private final CategoryRepository categoryRepository;

    public MainController(MainService mainService,ClassRepository classRepository,CategoryRepository categoryRepository){
        this.mainService = mainService;
        this.classRepository = classRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public ModelAndView home(){
        List<Class> classes = classRepository.findAll();
        List<Category> categories = categoryRepository.findAll();
        ModelAndView mv = new ModelAndView();
        mv.addObject("classes",classes);
        mv.addObject("categories",categories);
        mv.setViewName("home.html");
        return mv;
    }
}
