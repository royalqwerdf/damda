package com.sumin.team_damda.domain.component;


import com.sumin.team_damda.domain.entity.Category;
import com.sumin.team_damda.domain.entity.Class;
import com.sumin.team_damda.domain.entity.Member;
import com.sumin.team_damda.domain.repository.CategoryRepository;
import com.sumin.team_damda.domain.repository.ClassRepository;
import com.sumin.team_damda.domain.repository.MemberRepository;
import com.sumin.team_damda.domain.role.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {
    private final ClassRepository classRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public DataInitializer(ClassRepository classRepository, CategoryRepository categoryRepository, MemberRepository memberRepository){
        this.classRepository = classRepository;
        this.categoryRepository = categoryRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public void run(ApplicationArguments args){

        Member testMember1 = Member.builder()
                .nickname("홍길동")
                .role(Role.MANAGER)
                .email("abc@aa.com")
                .password("1234")
                .userId("gildong")
                .build();
        Member testMember2 = Member.builder()
                .nickname("마동석")
                .role(Role.USER)
                .email("ddd@aa.com")
                .password("1234")
                .userId("dongsuk")
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
                .contact("010-1234-5678")
                .price(50000)
                .category(testCategory1)
                .manager(testMember1)
                .mainImage("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMDNfMjEx%2FMDAxNzA0Mjg4OTAwMDU0.vUzlfYhZToSJMdB9ueQu33s0-mC3sI9Gw8dp2c9Z_Fwg.ZzvD3Xvb9kP31E8lohd_KSIoFH63yJYB2ZvbgLBDbNcg.JPEG.jsit2022%2FDSC00327.jpg&type=sc960_832")
                .classExplanation("맛있는 파스타 만들기")
                .time("18,19,20")
                .headcount(5)
                .rating(4.6f)
                .searchKeywords("#요리#파스타#양식")
                .likeCount(102)
                .location("서울")
                .build();

        Class testClass2 = Class.builder()
                .className("도자기")
                .contact("010-1234-1234")
                .price(80000)
                .category(testCategory2)
                .manager(testMember1)
                .mainImage("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MjNfNTAg%2FMDAxNjkwMTE3NDI4ODg4.7q_4oLn-hTkVVL9JUruQ9_p-VZAqsV2aqrbNv_wvtQcg.S24QkBJPfmCapMXog1bWhtprhX0yox_FNb7KqYBkY40g.JPEG.yaysong%2FIMG_2040.jpg&type=sc960_832")
                .classExplanation("멋진 도자기 만들기")
                .time("18,19,20")
                .headcount(3)
                .rating(4.5f)
                .searchKeywords("#도자기#예술#백자")
                .likeCount(155)
                .location("부산")
                .build();

        Class testClass3 = Class.builder()
                .className("그림그리기")
                .contact("010-7777-7777")
                .price(70000)
                .category(testCategory3)
                .manager(testMember1)
                .mainImage("https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210820_127%2F1629443422879yi77D_JPEG%2F2KIk0hWYL8SLAc80XKM1O6eU.JPG.jpg&type=sc960_832")
                .classExplanation("이쁜 그림 그리기")
                .time("18,19,20")
                .headcount(2)
                .rating(4.9f)
                .searchKeywords("#그림#예술#수채화")
                .likeCount(250)
                .location("서울")
                .build();

        Class testClass4 = Class.builder()
                .className("테이블 만들기")
                .contact("010-1111-1111")
                .price(90000)
                .category(testCategory4)
                .manager(testMember1)
                .mainImage("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MTRfMjM0%2FMDAxNjYwNDQwNjc2NTU1.CJvCYW9EhYiVrt-ve5q99dnfEe1At14OkpgBDrsywlEg.DwiJFkvtKOfmI3nbHfbkTG3ZytzqovyXfSBXBWD8XHkg.JPEG.theone18%2FIMG_1954.JPG&type=sc960_832")
                .classExplanation("간이 책상 만들기")
                .time("18,19,20")
                .headcount(2)
                .rating(4.4f)
                .searchKeywords("#목공#예술#책상")
                .likeCount(80)
                .location("파주")
                .build();

        classRepository.save(testClass1);
        classRepository.save(testClass2);
        classRepository.save(testClass3);
        classRepository.save(testClass4);

    }

}
