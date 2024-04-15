package com.team_damda.domain.controller;

import com.team_damda.domain.dto.UserInformationDTO;
import com.team_damda.domain.service.UserInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/UserHome")
public class UserInformationController {

    @Autowired
    private UserInformationService userInformationService;

    @GetMapping("/profile")
    public ResponseEntity<UserInformationDTO> getUserInformation(@RequestParam("userId") Long userId) {
        UserInformationDTO userProfile = userInformationService.getUserInformation(userId);
        return ResponseEntity.ok(userProfile);
    }
    /* if문으로 변경 필요한지 검토해보기
    else {
        return ResponseEntity.notFound().build();
    } */
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



