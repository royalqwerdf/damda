package com.team_damda.domain.service;

import com.team_damda.domain.dto.ClassDto;
import com.team_damda.domain.dto.ClassImageDto;
import com.team_damda.domain.dto.ClassTimeDto;
import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassService {
    private final ClassRepository classRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final ClassTimeRepository classTimeRepository;

    private final ClassImageRepository classImageRepository;

    @Autowired
    public ClassService(ClassRepository classRepository, CategoryRepository categoryRepository, MemberRepository memberRepository, ClassTimeRepository classTimeRepository, ClassImageRepository classImageRepository){
        this.classRepository = classRepository;
        this.categoryRepository = categoryRepository;
        this.memberRepository = memberRepository;
        this.classTimeRepository = classTimeRepository;
        this.classImageRepository = classImageRepository;
    }

    @Transactional
        public Long saveForClass(Long memberId, ClassDto classDto, List<ClassTimeDto> classTimeDtos, List<ClassImageDto> classImageDtos) {

            Member member = memberRepository.findById(memberId).orElse(null);
            Category category = categoryRepository.findByCategoryName(classDto.getCategoryName());
            Class classEntity = classDto.toEntity(category, member);

            for(ClassTimeDto classTimes : classTimeDtos) {
                ClassTime classTimeEntity = classTimes.toEntity(classEntity);
                classTimeRepository.save(classTimeEntity);
            }

            for(ClassImageDto classImages : classImageDtos) {
                ClassImage classImageEntity = classImages.toEntity(classEntity);
                classImageRepository.save(classImageEntity);
            }

            return classRepository.save(classEntity).getId();
    }

    @Transactional
    public List<ClassDto> getAllClass(){
        List<Class> allClass = classRepository.findAll();
        List<ClassDto> allClassDto = new ArrayList<>();
        for(Class onedayClass:allClass){
            ClassDto classDto = onedayClass.toDto();
            allClassDto.add(classDto);
        }
        return allClassDto;
    }


    @Transactional
    public List<ClassDto> getCategoryClass(long categoryId) {
        List<ClassDto> categoryClassDto = new ArrayList<>();
        List<Class> categoryClass = classRepository.findByCategoryId(categoryId);
        for(Class onedayClass:categoryClass){
            ClassDto classDto = onedayClass.toDto();
            categoryClassDto.add(classDto);
        }
        return categoryClassDto;
    }

    @Transactional
    public List<ClassDto> getBestClass(){
        List<ClassDto> bestClassDto = new ArrayList<>();
        List<Class> bestClass = classRepository.findTop12ByOrderByTotalRatingDescTotalLikeDesc();
        for(Class onedayClass:bestClass){
            ClassDto classDto = onedayClass.toDto();
            bestClassDto.add(classDto);
        }
        return bestClassDto;
    }

    @Transactional
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
