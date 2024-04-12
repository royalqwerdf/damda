package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminMemberRepository extends JpaRepository<Member, Long> {
}
