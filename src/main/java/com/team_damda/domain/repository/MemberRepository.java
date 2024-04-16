package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository  extends JpaRepository<Member,Long> {


    Optional<Member> getByUserEmail(String userEmail);

    Optional<Member> getByName(String name);

    Optional<Member> getByPhone(String phone);

    Optional<Member> getByRefreshToken(String refreshToken);

    Optional<Member> getByLoginTypeAndSnsId(LoginType loginType, String snsId);

    Member findByUserEmail(String email);

    List<Member> getByLoginType(LoginType loginType);

    /**
     * 액세스 토큰의 만료 시간을 삭제합니다.
     * @param currentTime 삭제할 액세스 토큰
     */
    @Modifying
    @Query("UPDATE Member m SET m.accessTokenExpiration = NULL WHERE m.accessTokenExpiration < :currentTime")
    void clearExpiredAccessTokens(@Param("currentTime") Instant currentTime);



}
