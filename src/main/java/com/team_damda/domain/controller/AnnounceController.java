package com.team_damda.domain.controller;

import com.team_damda.domain.dto.AnnounceDto;
import com.team_damda.domain.service.AnnounceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/announcements")
public class AnnounceController {
    private final AnnounceService announceService;

    @GetMapping
    public ResponseEntity<List<AnnounceDto>> getAllAnnouncements() {
        try {
            List<AnnounceDto> announcements = announceService.getAnnounce();
            return ResponseEntity.ok(announcements);
        } catch (Exception e) {
            // 로깅 등 오류 처리 로직 추가 가능
            return ResponseEntity.internalServerError().build();
        }
    }


    /**
     * 공지사항 생성
     * @param announceDto
     * @return
     */
    @PostMapping
    public ResponseEntity<AnnounceDto> createAnnouncement(@RequestBody AnnounceDto announceDto) {
        AnnounceDto createAnnouncement = announceService.createAnnouncement(announceDto);
        return ResponseEntity.ok(createAnnouncement);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnounceDto> getAnnouncementById(@PathVariable Long id) {
        try {
            AnnounceDto announcement = announceService.getAnnouncementById(id);
            return ResponseEntity.ok(announcement);
        } catch (Exception e) {
            // 로깅 등 오류 처리 로직 추가 가능
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * 공지사항 수정 업로드
     * @param id
     * @param announceDto
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<AnnounceDto> updateAnnouncement(@PathVariable Long id, @RequestBody AnnounceDto announceDto) {
        AnnounceDto updateAnnouncement = announceService.updateAnnouncement(id, announceDto);
        return ResponseEntity.ok(updateAnnouncement);
    }

    /**
     *  공지사항 삭제
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        announceService.deleteAnnouncement(id);
        return ResponseEntity.ok().build();
    }


}
