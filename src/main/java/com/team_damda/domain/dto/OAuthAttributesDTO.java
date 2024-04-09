package com.team_damda.domain.dto;

import com.team_damda.domain.entity.Member;
import com.team_damda.domain.enums.LoginType;
import com.team_damda.domain.enums.Role;
import com.team_damda.domain.info.GoogleOAuth2UserInfo;
import com.team_damda.domain.info.KakaoOAuth2UserInfo;
import com.team_damda.domain.info.NaverOAuth2UserInfo;
import com.team_damda.domain.info.OAuth2UserInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;
import java.util.UUID;

@Getter
public class OAuthAttributesDTO {
    private String nameAttributeKey;
    private OAuth2UserInfo oauth2UserInfo;

    @Builder
    private OAuthAttributesDTO(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }

    public static OAuthAttributesDTO of(LoginType loginType, String userNameAttributeName, Map<String, Object> attributes) {
        if (loginType == loginType.NAVER) {
            return ofNaver(userNameAttributeName, attributes);
        }
        if (loginType == loginType.KAKAO) {
            return  ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributesDTO ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributesDTO.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    private  static OAuthAttributesDTO ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributesDTO.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    private  static OAuthAttributesDTO ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributesDTO.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new NaverOAuth2UserInfo(attributes))
                .build();
    }

    public Member toEntity(LoginType loginType, OAuth2UserInfo oauth2UserInfo) {
        return Member.builder()
                .loginType(loginType)
                .snsId(oauth2UserInfo.getId())
                .userEmail(UUID.randomUUID() + "@socialUser.com")
                .name(oauth2UserInfo.getName())
                .imageUrl(oauth2UserInfo.getImageUrl())
                .role(Role.USER)
                .build();
    }

}
