package com.team_damda.domain.entity;

import com.team_damda.domain.dto.EventDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    @Column(name="upload_date")
    private LocalDateTime uploadTime;

    @OneToMany(mappedBy = "event")
    private List<EventImage> eventImages = new ArrayList<>();

    public EventDto toDto(){
        String image = eventImages.get(0).getImageUrl();
        return EventDto.builder()
                .id(this.id)
                .title(this.title)
                .content(this.content)
                .image(image)
                .build();
    }
}
