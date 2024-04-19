package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Announce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnounceRepository extends JpaRepository<Announce,Long> {

}