package com.team_damda.domain.entity;

import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="member")
@Builder
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="user_email", nullable = false, unique = true, length = 100)
    private String userEmail;

    @Column(name="password", nullable = true)
    private String password;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="phone", nullable = true, length = 20)
    private String phone;

    @Column(name="img_url")
    private String imageUrl;

    @Column(name="sns_id")
    private String snsId;

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name="login_type")
    @Enumerated(EnumType.STRING)
    private LoginType loginType;

    @Column(length = 1000)
    private String refreshToken;

    @Column(name="access_token_expiration")
    private Instant accessTokenExpiration;


    @OneToMany(mappedBy = "manager")
    private List<Class> classes = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ClassLike> classLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Announce> announces = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Inquiry> inquiries = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ClassReservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ClassReview> reviews = new ArrayList<>();


    public void authorizeUser() {
        this.role = Role.USER;
    }


    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }

    public void clearRefreshToken() {
        this.refreshToken = null; // 리프레시 토큰 필드를 null로 설정
    }



}

