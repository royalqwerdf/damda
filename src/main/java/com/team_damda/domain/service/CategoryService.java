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

    public CategoryDto addCategory(String categoryName) {
        Category existingCategory = categoryRepository.findByCategoryName(categoryName);
        if (existingCategory != null) {
            throw new IllegalStateException("이미 존재하는 카테고리명 입니다.");
        }
        Category newCategory = Category.builder()
                .categoryName(categoryName)
                .build();
        Category savedCategory = categoryRepository.save(newCategory);
        return savedCategory.toDto();
    }

    /**\
     *
     * @param id
     * @param categoryName
     * @return 카테고리 수정
     */
    public CategoryDto updateCategory(Long id, String categoryName) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다. id=" + id));

        category.setCategoryName(categoryName);  // 카테고리 이름 업데이트
        Category savedCategory = categoryRepository.save(category);
        return savedCategory.toDto();
    }

    /**
     * 카테고리 삭제
     * @param id
     */
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다. id=" + id));
        categoryRepository.delete(category);
    }
}
