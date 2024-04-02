package com.sumin.team_damda.domain.service;

import com.sumin.team_damda.domain.dto.ClassDto;
import com.sumin.team_damda.domain.entity.Class;
import com.sumin.team_damda.domain.repository.ClassRepository;
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
}
