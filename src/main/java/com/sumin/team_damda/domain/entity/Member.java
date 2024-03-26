package com.sumin.team_damda.domain.entity;

import com.sumin.team_damda.domain.role.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user")
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="user_id")
    private String userId;
    @Column(name="password")
    private String password;
    @Column(name="nickname")
    private String nickname;
    @Column(name="userEmail")
    private String email;

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "manager")
    private List<Class> classes = new ArrayList<>();

}
