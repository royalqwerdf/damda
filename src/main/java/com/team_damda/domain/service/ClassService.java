package com.team_damda.domain.service;

import com.team_damda.domain.dto.ClassDto;
import com.team_damda.domain.dto.ClassTimeDto;
import com.team_damda.domain.entity.Category;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassTime;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.CategoryRepository;
import com.team_damda.domain.repository.ClassRepository;
import com.team_damda.domain.repository.ClassTimeRepository;
import com.team_damda.domain.repository.MemberRepository;
import jakarta.persistence.EntityManagerFactory;
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

    @Autowired
    public ClassService(ClassRepository classRepository, CategoryRepository categoryRepository, MemberRepository memberRepository, ClassTimeRepository classTimeRepository){
        this.classRepository = classRepository;
        this.categoryRepository = categoryRepository;
        this.memberRepository = memberRepository;
        this.classTimeRepository = classTimeRepository;
    }

    @Transactional
    public Long saveForClass(Long memberId, Long categoryId, ClassDto classDto, ClassTimeDto classTimeDto) {

        Member member = memberRepository.findById(memberId).orElse(null);
        System.out.println("회원 이름1111111 : " + member.getName());
        Category category = categoryRepository.findById(categoryId).orElse(null);

        Class classEntity = classDto.toEntity(category, member);

        ClassTime classTimeEntity = classTimeDto.toEntity(classEntity);
        classTimeRepository.save(classTimeEntity);

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
    public List<ClassDto> getSearchClass(String keyword,String address,Long categoryId,
                                         String week,Long minPrice,Long maxPrice){

        System.out.println(keyword+address+categoryId+week+minPrice+maxPrice);
        List<ClassDto> searchClassDto = new ArrayList<>();
        List<Class> searchClass = classRepository.searchClass(keyword,address,categoryId,
                week,minPrice,maxPrice);

        for(Class onedayClass:searchClass){
            ClassDto classDto = onedayClass.toDto();
            searchClassDto.add(classDto);
        }
        return searchClassDto;

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
