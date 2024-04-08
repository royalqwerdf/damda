import React, {useEffect, useState} from 'react';
import axios from "axios";

function NewClassList(){
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        axios.get('/new')
            .then(response=>
            {
                setClasses(response.data);
                console.log(classes);
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <div id="new">
            <div id="text">
                <span>
                    DAMDA'S New
                </span>
            </div>
            <div id="newClass-container">
                <div id="classes">
                    {classes?.map(onedayClass => {
                        return (
                            <div id="classCard" key={onedayClass.categoryName}>
                                <a href="#">
                                    <img src={onedayClass.mainImage}/>
                                    <div id="classManagerNameRatingLike">
                                        <div id="left">
                                            <span>{onedayClass.managerName}</span>
                                        </div>
                                        <div id="right">
                                            <img id="star"
                                                 src="https://lh3.googleusercontent.com/fife/ALs6j_FF-LERCSvSJ0kW8GO4zEnQoxk0XJ4CT9nJmodeShAQkqLG9jTTHORa76w9kiy7hjSRChwmfPysdgVfEihQINvcKTzu-4hwwLeam3AMQWL2X4ZBve4NbxaoRwA4Itycr-4XNu_9iCIT7b_TTcN_gDloJP8QaRX8_Rq14Mvomj7gnogN-_RTvsR7HDry1S8YYj25w43VHa9fYyblaadWJfTUhSnqXCi_ZRiwjh2T0SJV4l14lqUDyFCSqaLW2aob-Icz57wJbhg9cYKYY-Xn7oDAm23B9VSoUxE84J2ncYqVmYlCD2VkynxZuo7eulLtTct246Brs0JAmJEIlu1wWcgDAeP-7q9_Lb5Uegh7UClCONs9mMcs0D_xT1X5S0gbs5qSNwDE966iU0Mk-BqF_0AWkmMXmhsEWJZC0ylBFhFlkvEcqnFPv86ViPTtqOaYWRp0M58y6jXSpiN0gYth9ynnfECl2QTcbgRJ8Re9HO_4N2XB3s0x0dfTHmCMttXod_oeR5fjSFSVVbZ_s1aV-B1M1QS5AktpC0B0_EpBceBArIrUBgTQ1t5QQRtqi7E88KvBBz-akrlr3QTjZfkpL2xYMqhzBxH3pewxHzBk95gjW3WNqO4Iyu1S16KDD7mk-0170SIIFpke0gZpyV7WRX1bfLCoRrJZ8js7DxTdOQwLhJm-FcJU4jH0N_km5UPAdn0cjayrEXBF-XkJYmK5oq2_rcTfTr-v_bheF30uAWt4CAX-MdNK8hy3lCX_PrFSP19vga2yYTJZUNcXQM_O3Y8YDf5eWSOR8yDhfAFFi1t5dEfIgCgsxNTDCVbul9hqcZCQfEA09ROxei-FfdfG2gG6i97TvFAHBCf4uBmIRvnjxte1nKvyrue4LEirFVZoGtQYXFC3sIuJe9p8F3nKiJpf1Nv34b3RdbgX4NkYGeXAkFzgCh2aYjTCFGSDub_ist4NRR142nqkmsDOmTqqvVS-fDCKYIgTT7dHom69QNfJX30lbeTaMkDn_d95-H4GOfES1y5ah7nwbVdpxrKAY1gOWMOv-b5_2cN7r1lz9I5jaIBzco9-kYPx4DXXqkXSD3PdGXiJsAmrf-a3335_L5Y2S_yXMJATy8AnW0tkgzeBicdgbFPBD7MUiFdjmp6zLjYHC0Xcluj45fzhJB_NgyFyfjGP0B0t_hOGbPok0uGl6BJCx8-UyGrZt6IVdwBLElAIE7CUQi9ULThTlzjLFE884rv3-zonoCvbJrOSCiTtCcLO4fqk1EIuMr-da1FfN2z0I1_69CQcF0GPs5BQZk6PKu5cLlMgnHSDRkUgEYcQUTxgNd1I2TgRrkhhcxaj2GYTPVcgR61ONcKcyemO6LquXfj_G-A7ERiZFs3CtXyQOA0LGuwobaDPSswDM3zk2AFIHxF8EuyyGETMS_x0-eb5666sKN2YK4Z0G8MOdkWmJZn9AGqu9qlotCJqMfGvYzlbaWh4tSjgnggGXVjra0RRyD0KeRUUg_2Bxi1VVNFD5cnbcWHHApH8UUZyLFSjmcoOvZNUF2A3BqmlT4nc0GDAV9_TjiFCU4MrUNhUcKY9WTw48slaqvV5KgpQJsFpl55zAdCEZpLcmTxR7Kib2HqY1uMOpw5EiHTumzj7fs7T4nMjEupCOQ=w1920-h969"/>
                                            <span>{onedayClass.totalRating}</span>
                                            <img
                                                src="https://lh3.googleusercontent.com/fife/ALs6j_FK1nWeOYpkD51YuAZhxM7VrskFa03VlDbSCUtV_CGOucfURX4MN2m33-h2BbkoiZIOAOtd3rRdqWXDg-KFJOHHoVA55GDJSrzWObqXc6FXsTDe-TWMC5txByIvcBEWuRROi6j41BN9mpnRW48tP57BZw79AbnjEOGXdjocMEOOURtOntTYKq8J8d3zIsQiBpVfKReegYCK_f3ke_z3ZLdkgCC05WrNHS7ickJm_SEz420PiHVQkTeEKtXSp44bizw4Ezs6mnaXwCLqHH4Ep0QacHTTRHYFcJSqss8T9dmN0u1j2wpqI01j2mobEKgbLcqvOI6jR_Qh8HpFkb7TVxnbBEPTW-_bu5Byv2Z1rtN0KuUqXbUC97zjZkTihw9SqUVWYuEW8gObZCnHYpoaI5bJvh088JlpTcYeUmd__VAAgdbaN07AxJpb4ckhhH7WT4YT17sjDGSWrXN81wk6791KHd_gMTBlzgXk0imDY-x93G5jKphqCZUX5FogXcxTsMw7_o6k6n47pgTr_RBDD12Rl0H4z9lRy2gtcovr4vhtUEtehZl-cBZP7ByGgbzPEoTWQCsPneWE4-T4GSx-8TGVP6Mb5mLVBMMA-QpIvl_uSIH-VYsiW9c3bBnUlseUUC-RWUm9EVfo35eEwQks-ecHS8d1UkL4w0GevZo5Uq0pWzZvqJ-9yzNWvLymvu0sM0ewKWD84AyXC_9SmJ-DYMpEMC3euvtKa061wsn9hapLTXlLf0fNrzzogiwZRSu-F4n1ji9dYAADmSOPsbWbCHovcyHbzeolm5XypTGwbV_QgRttaHpH_vP4YVINhYDizM0AMzbiSycZv9bm01iwZWFIw7mvmt2ylRSVXRQo7I8e7EKOnlMI1MCcXMONaa0GWbnq4J9A8-c3EVbCG6uWsIwDL-Kfhz9Me6IMNr8vANOevGv6PM-NYfYTwrHz0QEhfYGXM0YTsAD7Mp4QASKfcMuY1rfyBeTCmjxIn3K80_tZs-Nm6A-UyPOS8_IpjP2FAmBBFZIWjbEju7agYH1QxsjdVfWbFYcaPcFFIBgD7FsZDieKEfAkEqWk4zySpa5I8t9ngVeLJ7V8xJOxrWGzyzuvEiyMdF4mfJH7mbG9KkcHqW4Ci6lsGZQxH_HjsZnOsgfRVwlRlQiMd8FTfPPYsARZRnJfOr3Zp5tAnvOjTHHXcaw_M9X0zAm2Nwn-HYpVqSoc8Q-vFvqxLLw29k8HxJbEyRcmQwNDHwVZDErZMIrzWAw8p2DnojKicIxkWux3mWxAkzPtn4TBTOMT5mTwXE5pPIzkJ2DfyPIZ4uUORn3dVRsef0CYxSAwZXqhPWxcDiS3DcnnIXHttHW8gUQIoM-MV3tr1NnmhDktAXwYI5JtHkT83dHPoDd27sbdZfHGz7fSkTdfNmgcnhbRGuTj6TX04LZe9ZsnrmQapOknGLO3wiKPUV-EprsKpfhSxcD9llmtUQOPh14BVFbEDtjPoJJRnCWY-iCB_4-MHM9mv4mi4Rj3GBw5P_U7HgrbejK1u8lnBtCo5KVOjsNw4hqu-vch_-Od_xKWby9YjXzdsR77Xm8CHQk4m1ZNmyf01aE5tsALKeR8_bO-rAHDuJ_1tEoI8bh0CJO3tFPP_u-DHGRLgJA6THd9Lw=w1920-h969"/>
                                            <span>{onedayClass.totalLike}</span>
                                        </div>
                                    </div>
                                    <div id="className">
                                        <span>{onedayClass.className}</span>
                                    </div>
                                    <div id="classPrice">
                                        <span>{onedayClass.price} 원</span>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default NewClassList;