package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository  extends JpaRepository<Member,Long> {


    Optional<Member> getByUserEmail(String userEmail);

    Optional<Member> getByName(String name);

    Optional<Member> getByPhone(String phone);

    Optional<Member> getByRefreshToken(String refreshToken);

    Optional<Member> getByLoginTypeAndSnsId(LoginType loginType, String snsId);

    Member findByUserEmail(String email);

    Member findByClassId(long class_id);

}
