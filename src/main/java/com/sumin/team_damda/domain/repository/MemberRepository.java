package com.sumin.team_damda.domain.repository;

import com.sumin.team_damda.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository  extends JpaRepository<Member,Long> {
}
