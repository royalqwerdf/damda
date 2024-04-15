/*global kakao*/
import React, { useEffect } from "react";
import '../styles/reservation.css';
//const{ kakao } = window;

function MapContent({address}){

    useEffect(() => {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.50375,127.048895), // 초기 중심 좌표 설정
                level:3
            };
            const map = new kakao.maps.Map(container, options);

            // 지오코드 -> 주소 좌표 변환
            const geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(address, function(result, status) {

                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {

                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    const infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:150px;text-align:center;padding:6px 0;font-size:8px;">${address}</div>`
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });

        }, []);

        return(
            <div id ='map' style = {{
                width: '380px',
                height: '300px',
            }}></div>
        )
    }



export default MapContent;