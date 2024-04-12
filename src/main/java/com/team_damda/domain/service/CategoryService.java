package com.team_damda.domain.service;

import com.team_damda.domain.dto.CategoryDto;
import com.team_damda.domain.entity.Category;
import com.team_damda.domain.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategory(){
        List<Category> allCategories = categoryRepository.findAll();
        List<CategoryDto> allCategoryDtos = new ArrayList<>();
        for(Category category:allCategories){
            CategoryDto categoryDto = category.toDto();
            allCategoryDtos.add(categoryDto);
        }
        return allCategoryDtos;
    }
}
