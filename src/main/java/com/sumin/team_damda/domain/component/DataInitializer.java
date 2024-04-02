package com.sumin.team_damda.domain.component;


import com.sumin.team_damda.domain.entity.Category;
import com.sumin.team_damda.domain.entity.Class;
import com.sumin.team_damda.domain.entity.ClassImage;
import com.sumin.team_damda.domain.entity.Member;
import com.sumin.team_damda.domain.enums.LoginType;
import com.sumin.team_damda.domain.repository.CategoryRepository;
import com.sumin.team_damda.domain.repository.ClassImageRepository;
import com.sumin.team_damda.domain.repository.ClassRepository;
import com.sumin.team_damda.domain.repository.MemberRepository;
import com.sumin.team_damda.domain.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {
    private final ClassRepository classRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final ClassImageRepository classImageRepository;

    @Autowired
    public DataInitializer(ClassRepository classRepository, CategoryRepository categoryRepository, MemberRepository memberRepository,ClassImageRepository classImageRepository){
        this.classRepository = classRepository;
        this.categoryRepository = categoryRepository;
        this.memberRepository = memberRepository;
        this.classImageRepository = classImageRepository;
    }

    @Override
    public void run(ApplicationArguments args) {

        Member testMember1 = Member.builder()
                .name("홍길동")
                .role(Role.MANAGER)
                .password("1234")
                .userEmail("gildong@kakao.com")
                .phone("010-1111-2222")
                .loginType(LoginType.KAKAO)
                .build();
        Member testMember2 = Member.builder()
                .name("마동석")
                .role(Role.USER)
                .password("1234")
                .userEmail("dongsuk@kakao.com")
                .phone("010-2222-3333")
                .loginType(LoginType.GOOGLE)
                .build();

        memberRepository.save(testMember1);
        memberRepository.save(testMember2);

        Category testCategory1 = Category.builder()
                .categoryName("요리")
                .build();
        Category testCategory2 = Category.builder()
                .categoryName("공예")
                .build();
        Category testCategory3 = Category.builder()
                .categoryName("그림")
                .build();
        Category testCategory4 = Category.builder()
                .categoryName("목공")
                .build();

        categoryRepository.save(testCategory1);
        categoryRepository.save(testCategory2);
        categoryRepository.save(testCategory3);
        categoryRepository.save(testCategory4);

        Class testClass1 = Class.builder()
                .className("맛스타")
                .price(50000)
                .category(testCategory1)
                .manager(testMember1)
                .classExplanation("맛있는 파스타 만들기")
                .headcount(5)
                .totalRating(4.6f)
                .totalLike(102)
                .address("서울")
                .build();


        Class testClass2 = Class.builder()
                .className("도자기")
                .price(80000)
                .category(testCategory2)
                .manager(testMember1)
                .classExplanation("멋진 도자기 만들기")
                .headcount(3)
                .totalRating(4.5f)
                .totalLike(155)
                .address("부산")
                .build();

        Class testClass3 = Class.builder()
                .className("그림그리기")
                .price(70000)
                .category(testCategory3)
                .manager(testMember1)
                .classExplanation("이쁜 그림 그리기")
                .headcount(2)
                .totalRating(4.9f)
                .totalLike(250)
                .address("서울")
                .build();

        Class testClass4 = Class.builder()
                .className("테이블 만들기")
                .price(90000)
                .category(testCategory4)
                .manager(testMember1)
                .classExplanation("간이 책상 만들기")
                .headcount(2)
                .totalRating(4.4f)
                .totalLike(80)
                .address("파주")
                .build();


        classRepository.save(testClass1);
        classRepository.save(testClass2);
        classRepository.save(testClass3);
        classRepository.save(testClass4);

        ClassImage classImage1 = ClassImage.builder()
                .main_yn("Y")
                .imageUrl("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMDNfMjEx%2FMDAxNzA0Mjg4OTAwMDU0.vUzlfYhZToSJMdB9ueQu33s0-mC3sI9Gw8dp2c9Z_Fwg.ZzvD3Xvb9kP31E8lohd_KSIoFH63yJYB2ZvbgLBDbNcg.JPEG.jsit2022%2FDSC00327.jpg&type=sc960_832")
                .build();
        ClassImage classImage2 = ClassImage.builder()
                .main_yn("Y")
                .imageUrl("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MTBfMjg1%2FMDAxNjgzNjk3OTg5Nzc5.O7lCSAIjcqOCKovm_UiQp998-FdMpauksxIPrjoo704g.Jr1NmxDyteg522dVaNNcGBm2W7ilLxeO7PpQfg-41dAg.JPEG.stryper76%2F20230509_110431.jpg&type=a340")
                .build();
        ClassImage classImage3 = ClassImage.builder()
                .main_yn("Y")
                .imageUrl("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMDJfMjUw%2FMDAxNzA5Mzg3NDA3MDY2.ssiu2h8lYg2VouGEgW2aTOPo_40j-9OgzMpOZ8hD3mgg.9gSINqM4obGBi9LOkLooPRei2LAJJwkv1uyraEoA23gg.JPEG%2FDSC00472.JPG&type=a340")
                .build();
        ClassImage classImage4 = ClassImage.builder()
                .main_yn("Y")
                .imageUrl("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMThfMTIw%2FMDAxNjc5MTAwMzgxMDE1.qj0KekfEsrg8I8bb1ADnOgXc6y0NoOx0-9RLxbveYqQg.UE29J4-9ymVZXbjg9wYuACIMXITTrR0n_mMtefDYG2gg.JPEG.tidalsrhdwb%2FIMG_9739.jpg&type=a340")
                .build();

        classImageRepository.save(classImage1);
        classImageRepository.save(classImage2);
        classImageRepository.save(classImage3);
        classImageRepository.save(classImage4);

        ClassImage img1 = classImageRepository.findById(1L).orElse(null);
        img1.setOndayClass(testClass1);
        classImageRepository.save(img1);
        ClassImage img2 = classImageRepository.findById(2L).orElse(null);
        img2.setOndayClass(testClass4);
        classImageRepository.save(img2);
        ClassImage img3 = classImageRepository.findById(3L).orElse(null);
        img3.setOndayClass(testClass2);
        classImageRepository.save(img3);
        ClassImage img4 = classImageRepository.findById(4L).orElse(null);
        img4.setOndayClass(testClass3);
        classImageRepository.save(img4);

    }

}
