import React from 'react';
import '../styles/MainPage.css';
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import {useAuth} from "../api/AuthProvider";



function Navigation(){
    const { isLoggedIn, logout, loginType } = useAuth();

    const isAnyLoggedIn = (loginType) => {
        const localStorageAccessToken = localStorage.getItem(`${loginType}_accessToken`);
        console.log("localStorageAccessToken:", localStorageAccessToken);

        const cookieAccessToken = Cookies.get(`${loginType}_accessToken`);
        console.log("cookieAccessToken:", cookieAccessToken);

        return !!localStorageAccessToken || !!cookieAccessToken;
    };

    const handleLogout = () => {
        console.log("로그아웃 버튼이 클릭되었습니다.");
        logout();
    };

    return (
        <nav id="navibar">
            <div>
                <a href="/">
                    <img
                        src="https://lh3.googleusercontent.com/fife/ALs6j_HmEX4WdWVNmFAXcxoccln3aTimTEfmmaJur0gvHHXD3FkYsiLH2p_6leIfk9KJ5_fNYakNxALd6xM9NcEPQuwuMHldKFpb2BFKUy_3Q_OTlj0umajU05IoNWRCzmsdhL1nio2ys-n8J4ScpSpepfjCHWLGqf8d6W-pBIk71FrtKjE12IfD1vk0Bg1ai9QAEBwjuvyr954ny9KwsQMtkHJ_T9S5uZwxqzE2U6_BYBqdzicQVuAkJYEtO_fVORsaMgxjTukwgIiTmPVTLavPX5fNFNfMfvbGrl7-xpP2sbjCN0h0CnBXpnJMRiM35ITJkvLLa2eKp3SpISvtTNzG3H-Ody8cy5uNE2oeWNFj3ddq8nrIbK-ad7_ZG7uGJDamkqPRlCoA2yrN7Ds-PsufprQ8whUb3RQsEiSVbUeZURAgKqSY1bHyZK9em0mqb82So34OdHy3YO7lL8Jw91mPOEaVaOozmcFR8qzvACbmQqXSzoWCvrL-5GpOcjaRq-kn4aLR8KVk6MeXMAIeY-wwZ4uFFYMCgomJymcU0LdvMUyiIxJudmH_s7aPxDLVVFI0TfNll7baMtorV931lap07qFlBa-PoA-4FabHwsnFtBvhyfiPZir-wqPbYcgkTg_Nw72E_dzi4K6AFk1STysg9ht2rqP8QmCy7_Q4IT-jtaTtKTzxUu5O4tly3aEteIL8ZF4HrEs5I3zSanPAXVof3MMcld-EMfTJoXwvzWsz9QvWG9MeEOw4i_fg5PoXItZf5_7RpjB09RaQptwNLtdZHnlhezwmLQzS5MLQrCN3vgU6tLQL4wsFjnRQQUMcsB2iPVyGud1q146pGR7k5tcc46ETNcDPA5MJRfV3yVYkRHmZXWzxPUt73z16_Yhi0o9eed6nymukYsJnhsZJg6gRaEoTzLA0dXtM99GPeXZ3cn1hY8MQXWVUfkzshLKLGpykNOLq3dykQt4VLoYRLOrQu9Fpwk8wCPcQRMT_5dQrAeyEEx2ipOeVE2uQwq3FA6eQp8xpqEwg3D0t7IrXoj4z3hEbq5cYwgOLxLTTqyhtKwDRaCf9E5jIQqmG3YykpEUALDML8ZNNY3ixh-0hJd89LdCj1U6xjDaYFxrhrWPhKCvrXMQ6cFqtvg9cw61oiWtlr1KDOKRopXekIghS-fYgMSirbhYHhek-SsYDtVDBmNsTs-g-8sCxxsrHFbjTpwNCZOhJdVDeKneTHawalvQENQEY7-Ql6VN0W_6mI5JlxBpM6INsbhLKFXf0OVRJjMtXOJbwb_EHbN_rS_lWqCdhmYf8_WomZi1MWCWJHLAnSn2yy-IPRaeRgO6pkfu04L3kHnuHFjvITfssoE0D8lmi4ZTxZ9Omo24HE2OdIm1sTvDVuFT5PKLNGd2apED498n1o5-TyVVGSU8hAOkQ9u3o1ul9IU3exuMgAYnmfp8m3mjZUtwYSqB2UGTqGQ8qihtx8UMscf1zxkxRw-ZJ2jELAJHA1LML56pRqlTlVjulT23sbkGqzvWeacU4_Tmo8m-9lQx_qG_X92pqzN3a_Nabu5sIguzcx5nB-FY6M2lTCKktR7ntzBY8gQc6MGD8H-gG0gK-VzgrF1MdnEMXB3DUnCjNrWxgKmsFxJNiy-vbO5nXRYrArv6dJA=w1920-h970"/>
                </a>
            </div>
            <div id="menu">
                <Link to="/search">클래스</Link>
                <Link to="/news" id="news">담다소식</Link>
                <Link to="/inquiry">문의하기</Link>
            </div>

            <div>
            <Link to="/search">
                    <img id="searchIcon" src="https://lh3.googleusercontent.com/fife/ALs6j_HvauUn3aoeAxPoM-QtBTMHvcj9BtF78kU3iiizmRvd3lptcWkS7pZB3v_rgNb2PV1Vl8CWP1xEHZP76kJ-18fglvcmLlJUfxa7U4ueKBzIxWWbJo4sIZvb6Omo24bHT705iNelhwiQMOfH70nl691FZ8CNBuZnUrsyYOgYZZ2TffEilo6UV4LOlVKmxeoYZVOiKhrGbN5bCvC2cXj3y2b_kyYH4AaJCEEAsf5SUqt_R1UsS0nA7aWDbYXs5MPYxKUexUSqZXGvLU3h5iCHNAWUr3XJCFE6UdrRzQyS5cpZGVJ4vumNjlM_GjhBi6_tZyOgtbIcrNFkWGUFR9lvqc-7eYDrt8z_GAKa4YnS_ATQ7RsIJTz2waDvX3WfKQH5AsYZwNhg3-Ok-rMT1mUrLqHhqFfqVAvfrIIsw-dtlSxywlT7IluGq9Fa83rAS_dr-SiECLAiYDHNXinJD9nNusnwO_rStpmya73dn7pphcXI7pKYX4jH-AfgCt2ekYDev8HsGocMGXm1LyUyBXuPLLOPlq_BP3JKKQY4tGLwfIR-u82PLs3nvxQ3yAlq1vvcbbxO6UzT0IxJYC8wlm6AeG-_c-54N-cKrr1JgX32tltA2o43MYYzeTayd4OFHiw8_6WiUZDc9HIPlHg3eqyZVit_CjaFmUxDCIhGHVOEox-kJt_-ZaupH6qEhemrJFrGgFrPBNggXRSvnP2pcU0styCffIayuKpGiavcEk559HQ3DYw1aheFA8SjE-HBh4roTjoaPM_-vCkV1SuTVzQCKXiRY9CzSpOJ2o-An0dO5ha9bCmXyK5I9LQmzxCwZb3fMNPyJWy8PW2ysI-PPIBOY0fBZL9GBcoUGYOZWh3_mEE9dJzPLTL4MIjxtScWEoV07XhxBP_K-Z90HJYTaknq2j1ZrHNlLAbvaUDnDvyj699xYihz0uyKkY9PgBRpkdhMRLjcNFw2Y8fxYgMrXQLeX6CKNJ4h-lnsLCeUtnDSUhJaxZxexEOEikdKJqW7oqr3VrykuJn6sA2mXIcmMx8MjytTubZGwH1TawD0zNNuuYI3C-BA8GMhoChX8-ICYSb_-aNLGcIx5TpEcu7_2x3dR8Wsy3nJ4LWkthvN1y-WYyUrj5rDga1XAuuB0hm-uEbHTmpG-1Yx3_E8rW7QleuvcfAoBHkxrM8qJKDR5v4NqWkfm695YeN0QP7hcxqlH71o018xW0JXK-z2JMp1DN4wluXh4TkLpSptmkXUVeZtTzIYWb9F-M8mgNzVbLBk-qWypPOdVI7zzx57hq9HvkdMaLkrhxkKhO0SzG73gIf4k2hmz7LdoQawYpmZzj0bP7D6YMeVPt3oLeQ-ldFfAb0LnHxPkXKAwgl8QiSnLs2_-aE0hUgTFl3toprZ0dGD0GoQiwKoEGQnmGhyj2vX7t4Wo_GmS9jXjTzm9vxLNlV2Q1qjepTCRyhRt-SkcODuWXY2yYUVCD3NNNKT_eVLFy46iHHx_zQVCGtaU01i9_HuCvDzp1XlC3jT6OgCNtwrNO5dpSA9GWjnNgs8Qx7-TSPZJ5q6ZMIeK02kHUfzC1tOYb5LDxbhwsLQMut6ScbMm_YDchJ_Kcxo91gVA6c3D0jL7-FhyDvQVJ94ELshVQ3S9s1zNOZsOQqFgA=w1920-h969"/>
                </Link>
                {isAnyLoggedIn() ? (
                    <>
                        <Link to="/mypage" id="rightbar">MyPage</Link>
                        <Link to="/" onClick={handleLogout}>LogOut</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" id="rightbar">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
                <Link to="/class-open">
                    <button>
                        클래스 등록
                    </button>
                </Link>
                <Link to="/class-reservation">
                    <button>
                        예약하기
                    </button>
                </Link>
            </div>
        </nav>
    );
}


export default Navigation;