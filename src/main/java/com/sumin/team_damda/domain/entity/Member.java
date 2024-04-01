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

    @Column(name="user_email")
    private String userEmail;
    @Column(name="password")
    private String password;
    @Column(name="name")
    private String name;
    @Column(name="phone_number")
    private String phone;
    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(name="login_type")
    private String loginType;

    @OneToMany(mappedBy = "manager")
    private List<Class> classes = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ClassLike> classLikes = new ArrayList<>();

}
