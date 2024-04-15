package com.team_damda.domain.controller;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.repository.AdminMemberRepository;
import com.team_damda.domain.service.AdminMemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class AdminMemberController {
    private final AdminMemberRepository adminMemberRepository;
    private final AdminMemberService adminMemberService;

    // 회원 목록 불러오기
    @GetMapping("/admin/members")
    public ResponseEntity<List<Member>> getMembers() {
        return ResponseEntity.status(HttpStatus.OK).body(adminMemberRepository.findAll());
    }

    // 회원 삭제
    @DeleteMapping("/admin/members/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long memberId) {
        boolean isDeleted = adminMemberService.deleteMember(memberId);
        if(isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 회원 정보 수정
    @PutMapping("/admin/members/{memberId}")
    public ResponseEntity<Void> updateMember(@PathVariable Long memberId, String userEmail, String password, String name, String phone) {
        boolean isUpdated = adminMemberService.updateMember(memberId, userEmail, password, name, phone);
        if(isUpdated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/admin/members/search")
    public ResponseEntity<List<Member>> searchMembers(@RequestParam(required = false) String userEmail,
                                                      @RequestParam(required = false) String name) {
        List<Member> searchedMembers;
        if(userEmail != null) {
            searchedMembers = adminMemberService.findMembersByUserEmail(userEmail);
            return ResponseEntity.ok(searchedMembers);
        } else if (name != null) {
            searchedMembers = adminMemberService.findMembersByName(name);
            return ResponseEntity.ok(searchedMembers);
        } else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
