package com.team_damda.domain.controller;

import com.team_damda.domain.dto.*;
import com.team_damda.domain.entity.*;
import com.team_damda.domain.entity.Class;
import com.team_damda.domain.repository.*;
import com.team_damda.domain.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RequiredArgsConstructor
@RestController
public class ClassOpenController {

    private final ClassService classOpenService;
    private final ClassRepository classRepository;
    private final CategoryRepository categoryRepository;
    private final ClassTimeRepository classTimeRepository;
    private final ClassImageRepository classImageRepository;
    private final MemberRepository memberRepository;
    private final ClassReservationRepository reservationRepository;

    @GetMapping("/class-open")
    public ResponseEntity<List<String>> getCategoryNames() {
        List<String> categoryNames = new ArrayList<>();
        List<Category> categories = categoryRepository.findAll();

        for (Category category : categories) {
            categoryNames.add(category.getCategoryName());
            System.out.println("카테고리-Category: " + category.getCategoryName());
        }

        return ResponseEntity.ok().body(categoryNames);
    }

    @GetMapping("/class-open/{classId}")
    public Map<String, Object> getClassById(@PathVariable Long classId) {
        Class onedayClass = classRepository.findClassById(classId);
        ClassDto classDto = onedayClass.toDto();

        /* classTime은 중복값이 많이 저장되어 있기 때문에 수정시 그냥 원본들은 삭제하는 것으로 하겠음
        List<ClassTime> classTimes = classTimeRepository.findByOnedayClassId(classId);
        Set<ClassTimeDto> classTimeDtoSet = new HashSet<>(); // 중복 제거를 위해 Set 사용
        for (ClassTime classTime : classTimes) {
            classTimeDtoSet.add(classTime.toDto());
        }
        // Set을 다시 리스트로 변환
        List<ClassTimeDto> classTimeDtos = new ArrayList<>(classTimeDtoSet);
         */


        /* classImage 또한 파이어베이스 스토리지 자체의 이미지까지 삭제하는 기능이 없어 수정시 DB 원본은 삭제하는 걸로
        List<ClassImage> classImages = classImageRepository.findByOnedayClassId(classId);
        List<ClassImageDto> classImageDtos = new ArrayList<>();
        for(ClassImage classImage : classImages) {
            classImageDtos.add(classImage.toDto());
        }
         */

        Map<String, Object> result = new HashMap<>();
        result.put("onedayClass", classDto);

        return result;
    }


    @PostMapping("/class-open/{memberId}")
    public Long createClass(@RequestBody RequestData requestData, @PathVariable Long memberId) {

        ClassDto classDto = requestData.getClassDto();
        List<ClassTimeDto> classTimeDtos = requestData.getClassTimeDtos();
        List<ClassImageDto> classImageDtos = requestData.getClassImageDtos();


        return classOpenService.saveForClass(memberId, classDto, classTimeDtos, classImageDtos);
    }

    @GetMapping("/admin-home/class")
    public Map<String, Object> getClassList(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<ClassDto> classPage = classOpenService.getClassByOrder(pageRequest);

        Map<String, Object> result = new HashMap<>();
        result.put("classList", classPage.getContent());
        result.put("totalPages", classPage.getTotalPages());
        result.put("totalElements", classPage.getTotalElements());

        return result;
    }

    @PostMapping("/admin-home/class")
    public ResponseEntity<Map<String, Object>> getClassSetting(@RequestBody ClassRequest request) {
        String category = request.getCategory();
        String classId = request.getClassId();
        String searching = request.getSearching();
        Date startDay = request.getStartDay();
        Date endDay = request.getEndDay();

        List<Class> sortClasses = classOpenService.sortClass(category, classId, searching, startDay, endDay);

        int pageSize = 10;
        Page<Class> sortedPage = new PageImpl<>(sortClasses, PageRequest.of(0, pageSize), sortClasses.size());
        Page<ClassDto> sortedDtoPage = sortedPage.map(Class::toDto);

        Map<String, Object> result = new HashMap<>();
        result.put("classList", sortedDtoPage.getContent());
        result.put("totalPages", sortedDtoPage.getTotalPages());
        result.put("totalElements", sortedDtoPage.getTotalElements());

        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/class-open/update/{classId}")
    public void updateClass(@RequestBody RequestData requestData, @PathVariable Long classId) {

        List<ClassReservation> reservations = reservationRepository.findByOnedayClassId(classId);
        if(!reservations.isEmpty()) {
            throw new IllegalStateException("Cannot update class with non-empty cart list");
        } else {

            List<ClassTime> classTimes = classTimeRepository.findByOnedayClassId(classId);

            for(ClassTime classTime : classTimes) {
                if(!classTime.getCartList().isEmpty()) {
                    throw new IllegalStateException("Cannot update class with non-empty cart list");
                }
            }

            for(ClassTime classTime : classTimes) {
                classTimeRepository.delete(classTime);
            }

            List<ClassImage> classImages = classImageRepository.findByOnedayClassId(classId);
            for(ClassImage classImage : classImages) {
                classImageRepository.delete(classImage);
            }

            ClassDto classDto = requestData.getClassDto();
            List<ClassTimeDto> classTimeDtos = requestData.getClassTimeDtos();
            List<ClassImageDto> classImageDtos = requestData.getClassImageDtos();

            classOpenService.updateClass(classId, classDto, classTimeDtos, classImageDtos);
        }
    }


    @DeleteMapping("/admin-home/class_delete/{classId}")
    public void deleteClass(@PathVariable Long classId) {
        classOpenService.deleteClassAndRelations(classId);
    }

}
