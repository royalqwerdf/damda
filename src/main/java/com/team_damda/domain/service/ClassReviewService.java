package com.team_damda.domain.service;

import com.team_damda.domain.dto.ClassReservationDto;
import com.team_damda.domain.dto.ClassReviewDto;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.entity.ClassReview;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.ClassRepository;
import com.team_damda.domain.repository.ClassReviewRepository;
import com.team_damda.domain.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ClassReviewService {
    private final MemberRepository memberRepository;
    private final ClassRepository classRepository;
    private final ClassReviewRepository classReviewRepository;

    public void createReview(ClassReviewDto reviewDto) {
        Member member  = memberRepository.findById(reviewDto.getUser_id())
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        Class reviewClass = classRepository.findById(reviewDto.getClass_id())
                .orElseThrow(() -> new EntityNotFoundException("Class not found"));
        ClassReview classReview = reviewDto.toEntity();
        classReview.setMember(member);
        classReview.setOnedayClass(reviewClass);
        classReviewRepository.save(classReview);
    }
    public List<ClassReviewDto> getClassReview(Long classId){
        List<ClassReviewDto> newClassReviewDto = new ArrayList<>();
        List<ClassReview> classReviews = classReviewRepository.findByOnedayClassId(classId);
        for(ClassReview classReview : classReviews){
            ClassReviewDto classReviewDto = classReview.toDto();
            newClassReviewDto.add(classReviewDto);
        }
        return  newClassReviewDto;
    }
}
