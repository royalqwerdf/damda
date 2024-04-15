package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminMemberRepository extends JpaRepository<Member, Long> {
    List<Member> findMembersByUserEmail(String userEmail);
    List<Member> findMembersByName(String name);
}
