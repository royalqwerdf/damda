package com.team_damda.domain.controller;

import com.team_damda.domain.dto.UserInformationDTO;
import com.team_damda.domain.service.UserInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/UserHome")
public class UserInformationController {

    @Autowired
    private UserInformationService userInformationService;

    @GetMapping("/profile")
    public ResponseEntity<UserInformationDTO> getUserProfile(@RequestParam("userId") Long userId) {
        UserInformationDTO userProfile = userInformationService.getUserInformation(userId);
        return ResponseEntity.ok(userProfile);
    }

}

