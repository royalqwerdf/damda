package com.team_damda.domain.entity;

import com.google.api.client.util.DateTime;
import com.team_damda.domain.dto.ClassReservationDto;
import com.team_damda.domain.repository.ClassTimeRepository;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Table(name="class_reservation")
public class ClassReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @CreatedDate
    @Column(name="reservation_date_time", nullable = false, updatable = false, columnDefinition = "TIMESTAMP")
    private Date reservationDateTime;

    @Column(name="class_type")
    private String classType;

    @Column(name="select_person")
    private int select_person;

    @Column(name="total_price")
    private int total_price;

    @Column(name="select_date")
    private Date select_date;


    @Column(name="select_time")
    private Long select_time;

    @Column(name="userEmail")
    private String userEmail;

    @Column(name="className")
    private String className;

    @ManyToOne
    @JoinColumn(name="class_id")
    private Class onedayClass;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member member;

    @OneToOne
    @JoinColumn(name="order_detail_id")
    private OrderDetail orderDetail;

    public ClassReservationDto toDto(){
        String mainImage = "";
        for(ClassImage classImage:this.onedayClass.getClassImages()){
            if(classImage.getMain_yn().equals("y")){
                mainImage = classImage.getImageUrl();
            }
        }

        return ClassReservationDto.builder()

                .reservation_id(this.id)
                .classType(this.classType)
                .total_price(this.total_price)
                .select_date(this.select_date)
                .select_time(this.select_time)
                .select_person(this.select_person)
                .mainImage(mainImage)
                .userEmail(member.getUserEmail())
                .className(onedayClass.getClassName())
                .userName(member.getName())
                .build();
    }
}
