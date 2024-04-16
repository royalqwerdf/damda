package com.team_damda.domain.controller;

import com.team_damda.domain.dto.UserInformationDTO;
import com.team_damda.domain.service.UserInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/userinformation")
public class UserInformationController {

    @Autowired
    private UserInformationService userInformationService;

    @GetMapping("/get-userinformation")
    public ResponseEntity<UserInformationDTO> getUserInformation(@RequestParam("userId") Long userId) {
        UserInformationDTO userProfile = userInformationService.getUserInformation(userId);
        return ResponseEntity.ok(userProfile);
    }
    /* if문으로 변경 필요한지 검토해보기
    else {
        return ResponseEntity.notFound().build();
    } */
    // 사용자 정보 수정
    @PostMapping("/modify-userinformation")
    public ResponseEntity<UserInformationDTO> updateUserInformation(@RequestParam("userId") Long userId, @RequestBody UserInformationDTO updatedUserInformation) {
        // 클라이언트에서 받은 수정된 사용자 정보를 기반으로 업데이트합니다.
        UserInformationDTO updatedUserProfile = userInformationService.updateUserInformation(userId, updatedUserInformation);

        // 업데이트된 정보를 클라이언트에 응답으로 반환합니다.
        return ResponseEntity.ok(updatedUserProfile);
    }



    @DeleteMapping("/{memberId}")
    public ResponseEntity<?> deleteUserInformation(@PathVariable("memberId") Long memberId) {
        try {
            userInformationService.deleteUserInformation(memberId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete order detail");
        }
    }
    }



