package com.team_damda.domain.service;

import com.team_damda.domain.dto.OAuthAttributesDTO;
import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.oauth2.CustomOAuth2User;
import com.team_damda.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.util.logging.Log;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;

    private final JwtService jwtService;

    private static final String NAVER = "naver";
    private static final String KAKAO = "kakao";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        LoginType loginType = getLoginType(registrationId);
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuthAttributesDTO extractAttributes = OAuthAttributesDTO.of(loginType, userNameAttributeName, attributes);

        Member createdUser = getMember(extractAttributes, loginType);

        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createdUser.getUserEmail(),
                createdUser.getRole(),
                createdUser.getLoginType()
        );
    }

    private LoginType getLoginType(String registrationId) {
        if(NAVER.equals(registrationId)) {
            return LoginType.NAVER;
        }
        if (KAKAO.equals(registrationId)) {
            return LoginType.KAKAO;
        }
        return LoginType.GOOGLE;
    }

//    private Member getMember(OAuthAttributesDTO attributes, LoginType loginType) {
//        Member getMember = memberRepository.getByLoginTypeAndSnsId(loginType, attributes.getOauth2UserInfo().getId()).orElse(null);
//
//        if (getMember == null) {
//            return saveMember(attributes, loginType);
//        }
//        return getMember;
//    }

//    private Member getMember(OAuthAttributesDTO attributes, LoginType loginType) {
//        Member getMember = memberRepository.getByLoginTypeAndSnsId(loginType, attributes.getOauth2UserInfo().getId()).orElse(null);
//
//        if (getMember == null) {
//            return saveMember(attributes, loginType);
//        } else {
//            // 이미 가입한 사용자이므로 새로운 핸드폰 번호를 받지 않고 로그인 진행
//            return getMember;
//        }
//    }

    private Member getMember(OAuthAttributesDTO attributes, LoginType loginType) {
        Member existingMember = memberRepository.getByLoginTypeAndSnsId(loginType, attributes.getOauth2UserInfo().getId()).orElse(null);

        if (existingMember == null) {
            // 새로운 가입자인 경우에만 핸드폰 번호를 받음
            return saveMember(attributes, loginType);
        } else {
            // 이미 가입한 사용자이므로 핸드폰 번호를 받지 않고 로그인 진행
            return existingMember;
        }
    }


//    private Member saveMember(OAuthAttributesDTO attributes, LoginType loginType) {
//        Member createdUser = attributes.toEntity(loginType, attributes.getOauth2UserInfo());
//        return memberRepository.save(createdUser);
//    }

    private Member saveMember(OAuthAttributesDTO attributes, LoginType loginType) {
        String refreshToken = jwtService.createRefreshToken();  // Refresh Token 생성
        Member createdUser = attributes.toEntity(loginType, attributes.getOauth2UserInfo());
        createdUser.setRefreshToken(refreshToken);  // 생성된 Refresh Token 설정
        return memberRepository.save(createdUser);  // 데이터베이스에 저장
    }

}
