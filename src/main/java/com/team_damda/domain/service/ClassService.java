package com.team_damda.domain.service;

import com.team_damda.domain.dto.ClassDto;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.repository.ClassRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassService {
    private final ClassRepository classRepository;

    public ClassService(ClassRepository classRepository){
        this.classRepository = classRepository;
    }

    public List<ClassDto> getAllClass(){
        List<Class> allClass = classRepository.findAll();
        List<ClassDto> allClassDto = new ArrayList<>();
        for(Class onedayClass:allClass){
            ClassDto classDto = onedayClass.toDto();
            allClassDto.add(classDto);
        }
        return allClassDto;
    }

    public List<ClassDto> getCategoryClass(int categoryId) {
        List<ClassDto> categoryClassDto = new ArrayList<>();
        List<Class> categoryClass = classRepository.findByCategoryId(categoryId);
        for(Class onedayClass:categoryClass){
            ClassDto classDto = onedayClass.toDto();
            categoryClassDto.add(classDto);
        }
        return categoryClassDto;
    }

    public List<ClassDto> getBestClass(){
        List<ClassDto> bestClassDto = new ArrayList<>();
        List<Class> bestClass = classRepository.findTop12ByOrderByTotalRatingDescTotalLikeDesc();
        for(Class onedayClass:bestClass){
            ClassDto classDto = onedayClass.toDto();
            bestClassDto.add(classDto);
        }
        return bestClassDto;
    }

    public List<ClassDto> getNewClass(){
        List<ClassDto> newClassDto = new ArrayList<>();
        List<Class> newClass = classRepository.findTop12ByOrderByIdDesc();
        for(Class onedayClass:newClass){
            ClassDto classDto = onedayClass.toDto();
            newClassDto.add(classDto);
        }
        return newClassDto;
    }
}
