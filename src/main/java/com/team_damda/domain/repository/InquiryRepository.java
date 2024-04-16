package com.team_damda.domain.repository;

import com.team_damda.domain.entity.Inquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findAll();

    Page<Inquiry> findAllByOrderByCreatedAtDesc(Pageable pageable);

    List<Inquiry> findAllByMember_Id(Long memberId);


}
