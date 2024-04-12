package com.team_damda.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="inquiry")
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="type")
    private String type;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    @Column(name="reply")
    private String reply;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Member member;


}
