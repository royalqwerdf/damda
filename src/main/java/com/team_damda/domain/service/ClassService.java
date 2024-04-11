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
import java.util.Calendar;
import java.util.Date;
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

            Date classStartsAt = classEntity.getStartDate();
            Date classEndsAt = classEntity.getLastDate();
            String weekday = classEntity.getWeekdays();

            //사용자가 설정한 기간 내 모든 수업 가능한 날짜들의 리스트 저장
            List<Date> selectedDates = getSelectedDates(classStartsAt, classEndsAt, weekday);

            //한 클래스의 수업 가능 날짜들 -> 각 날짜의 수업시간들 저장
            for(Date openClassDate : selectedDates) {
                System.out.println("수업가능 날짜 : " + openClassDate);
                for(ClassTimeDto classTimes : classTimeDtos) {
                    ClassTime classTimeEntity = classTimes.toEntity(classEntity);
                    classTimeEntity.setClassDate(openClassDate); // 해당 수업 시간이 어떤 날짜에 편성되었는지 새로 추가
                    classTimeRepository.save(classTimeEntity);
                }
            }

            for(ClassImageDto classImages : classImageDtos) {
                ClassImage classImageEntity = classImages.toEntity(classEntity);
                classImageRepository.save(classImageEntity);
            }

            return classRepository.save(classEntity).getId();
    }

    public static List<Date> getSelectedDates(Date startDate, Date endDate, String weekday) {
        List<Date> selectedDates = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);

        String[] weekdays = weekday.split(" ");
        int[] weekdayNumbers = new int[weekdays.length];
        for(int i = 0; i < weekdays.length; i++) {
            switch(weekdays[i]) {
                case "월":
                    weekdayNumbers[i] = Calendar.MONDAY;
                    break;
                case "화":
                    weekdayNumbers[i] = Calendar.TUESDAY;
                    break;
                case "수":
                    weekdayNumbers[i] = Calendar.WEDNESDAY;
                    break;
                case "목":
                    weekdayNumbers[i] = Calendar.THURSDAY;
                    break;
                case "금":
                    weekdayNumbers[i] = Calendar.FRIDAY;
                    break;
                case "토":
                    weekdayNumbers[i] = Calendar.SATURDAY;
                    break;
                case "일":
                    weekdayNumbers[i] = Calendar.SUNDAY;
                    break;
            }
        }
        while(!calendar.getTime().after(endDate)) {
            int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
            if(contains(weekdayNumbers, dayOfWeek)) {
                selectedDates.add(calendar.getTime());
            }
            calendar.add(Calendar.DATE, 1); // while 안에서 다음 날짜로 이동하는 코드
        }
        return selectedDates;
    }

    // 배열에 특정 값이 포함되어 있는지 확인하는 메서드
    public static boolean contains(int[] arr, int target) {
        for (int num : arr) {
            if (num == target) {
                return true;
            }
        }
        return false;
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
