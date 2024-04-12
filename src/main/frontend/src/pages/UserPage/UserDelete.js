import React from 'react';
import '../../styles/UserDelete.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import UserButton from "../../components/UserButton";

function UserDelete() {
    const userDeleteClick = () => {
        // 여기에 탈퇴하기 버튼이 클릭되었을 때 수행할 동작을 구현합니다.
        console.log('탈퇴가 완료되었습니다.');
    };



    return (

        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>


            <div className="my-delete">
                <p>회원정보</p>
                <a>회원탈퇴</a>
            </div>


            <div className="delete-container">
            <div className="damda-delete-img">
                <img
                    src="https://lh3.googleusercontent.com/fife/ALs6j_HmEX4WdWVNmFAXcxoccln3aTimTEfmmaJur0gvHHXD3FkYsiLH2p_6leIfk9KJ5_fNYakNxALd6xM9NcEPQuwuMHldKFpb2BFKUy_3Q_OTlj0umajU05IoNWRCzmsdhL1nio2ys-n8J4ScpSpepfjCHWLGqf8d6W-pBIk71FrtKjE12IfD1vk0Bg1ai9QAEBwjuvyr954ny9KwsQMtkHJ_T9S5uZwxqzE2U6_BYBqdzicQVuAkJYEtO_fVORsaMgxjTukwgIiTmPVTLavPX5fNFNfMfvbGrl7-xpP2sbjCN0h0CnBXpnJMRiM35ITJkvLLa2eKp3SpISvtTNzG3H-Ody8cy5uNE2oeWNFj3ddq8nrIbK-ad7_ZG7uGJDamkqPRlCoA2yrN7Ds-PsufprQ8whUb3RQsEiSVbUeZURAgKqSY1bHyZK9em0mqb82So34OdHy3YO7lL8Jw91mPOEaVaOozmcFR8qzvACbmQqXSzoWCvrL-5GpOcjaRq-kn4aLR8KVk6MeXMAIeY-wwZ4uFFYMCgomJymcU0LdvMUyiIxJudmH_s7aPxDLVVFI0TfNll7baMtorV931lap07qFlBa-PoA-4FabHwsnFtBvhyfiPZir-wqPbYcgkTg_Nw72E_dzi4K6AFk1STysg9ht2rqP8QmCy7_Q4IT-jtaTtKTzxUu5O4tly3aEteIL8ZF4HrEs5I3zSanPAXVof3MMcld-EMfTJoXwvzWsz9QvWG9MeEOw4i_fg5PoXItZf5_7RpjB09RaQptwNLtdZHnlhezwmLQzS5MLQrCN3vgU6tLQL4wsFjnRQQUMcsB2iPVyGud1q146pGR7k5tcc46ETNcDPA5MJRfV3yVYkRHmZXWzxPUt73z16_Yhi0o9eed6nymukYsJnhsZJg6gRaEoTzLA0dXtM99GPeXZ3cn1hY8MQXWVUfkzshLKLGpykNOLq3dykQt4VLoYRLOrQu9Fpwk8wCPcQRMT_5dQrAeyEEx2ipOeVE2uQwq3FA6eQp8xpqEwg3D0t7IrXoj4z3hEbq5cYwgOLxLTTqyhtKwDRaCf9E5jIQqmG3YykpEUALDML8ZNNY3ixh-0hJd89LdCj1U6xjDaYFxrhrWPhKCvrXMQ6cFqtvg9cw61oiWtlr1KDOKRopXekIghS-fYgMSirbhYHhek-SsYDtVDBmNsTs-g-8sCxxsrHFbjTpwNCZOhJdVDeKneTHawalvQENQEY7-Ql6VN0W_6mI5JlxBpM6INsbhLKFXf0OVRJjMtXOJbwb_EHbN_rS_lWqCdhmYf8_WomZi1MWCWJHLAnSn2yy-IPRaeRgO6pkfu04L3kHnuHFjvITfssoE0D8lmi4ZTxZ9Omo24HE2OdIm1sTvDVuFT5PKLNGd2apED498n1o5-TyVVGSU8hAOkQ9u3o1ul9IU3exuMgAYnmfp8m3mjZUtwYSqB2UGTqGQ8qihtx8UMscf1zxkxRw-ZJ2jELAJHA1LML56pRqlTlVjulT23sbkGqzvWeacU4_Tmo8m-9lQx_qG_X92pqzN3a_Nabu5sIguzcx5nB-FY6M2lTCKktR7ntzBY8gQc6MGD8H-gG0gK-VzgrF1MdnEMXB3DUnCjNrWxgKmsFxJNiy-vbO5nXRYrArv6dJA=w1920-h970"/>
                <div className="delete-ask">서비스를 탈퇴하시겠습니까?
                </div>
            </div>

            <div className="delete-ask2">
                더 이상 즐거운 클래스들을 만날 수 없습니다.
            </div>

            <div className="delete-button">
                <UserButton onClick={userDeleteClick} type="submit" variant="user-delete">탈퇴하기</UserButton>
            </div>
            </div>
        </div>
    )

}

export default UserDelete;