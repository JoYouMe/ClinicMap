import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/mapContainer.module.css';

// window 전역 객체에 들어간 kakao 객체를 사용
const { kakao } = window;

const MapContainer = () => {
  const [clinicInfo, setClinicInfo] = useState([]);
  const [map, setMap] = useState();
  const [clinicItem, setClinicItem] = useState({});

  // clinic 정보 가져옴
  const getClinicInfo = useCallback((y, x) => {
    axios({
      url: `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?ServiceKey=VOCMrLKUaPto%2BKFS%2Ftt8cOiGKcecvqtjqzPiVicYLv1gpRiujBwiqLWaxGkzi8Gl9hp5O%2B%2Bhqb8BQInhgR5kvA%3D%3D&xPos=${x}&yPos=${y}&radius=5000`,
      method: 'get',
    }).then((response) => {
      console.log(response);
      setClinicInfo(response.data.response.body.items.item);
    });
  }, []);

  // kakaoMap 생성, clinic 정보 불러옴
  useEffect(() => {
    const container = document.getElementById('kakaoMap'); // 지도를 담을 역역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표
      level: 8, // 지도의 레벨(확대, 축소 정도)
    };
    setMap(new kakao.maps.Map(container, options)); // 지도 생성 및 객체 리턴

    getClinicInfo(37.450701, 126.570667);
  }, []);

  useEffect(() => {
    // HTML5의 geolocaiton으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옴
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        // 내 위치
        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation 좌표로 생성
          message = '<div style="padding:5px;">🚩현위치입니다</div>'; // 인포윈도우에 표시

        // 마커와 인포윈도우를 표시
        let marker = displayMarker(locPosition);

        let iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;

        // 인포윈도우 생성
        let infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 인포윈도우를 마커위에 표시
        infowindow.open(map, marker);

        // 지도 중심좌표를 접속위치로 변경
        if (map !== undefined) {
          map.setCenter(locPosition);

          kakao.maps.event.addListener(map, 'dragend', function () {
            // 지도의 현재 레벨
            let level = map.getLevel();

            // 지도 영역정보를 얻어옵니다
            let bounds = map.getBounds();

            // 영역정보의 남서쪽 정보를 얻어옵니다
            let swLatlng = bounds.getSouthWest();

            // 영역정보의 북동쪽 정보를 얻어옵니다
            let neLatlng = bounds.getNorthEast();

            // 지도 중심
            let latlng = map.getCenter();
            getClinicInfo(latlng.getLat(), latlng.getLng());
          });
        }
      });
    } else {
    }
  }, [map]);

  // 지도에 마커와 인포윈도우를 표시하는 함수
  function displayMarker(locPosition) {
    // 마커 생성
    let marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });
    return marker;
  }

  useEffect(() => {
    // 클릭 이벤트
    const onClickMaker = (item) => {
      setClinicItem(item);
    };
    // 데이터 변경시 마커 찍기
    for (let i = 0; i < clinicInfo.length; i++) {
      let position = new kakao.maps.LatLng(
        clinicInfo[i].YPos,
        clinicInfo[i].XPos
      );
      // 클릭 이벤트
      let marker = displayMarker(position);
      kakao.maps.event.addListener(marker, 'click', function () {
        onClickMaker(clinicInfo[i]);
      });
    }
  }, [clinicInfo]);

  return (
    <div>
      <div>
        <div className={styles.kakaoMap} id="kakaoMap"></div>
        <div className={styles.saveClinicList}>
          <p>리스트</p>
        </div>
      </div>
      <div className={styles.clinicDetail}>
        <p>세부 내용</p>
        <p>{clinicItem.yadmNm}</p>
        <p>{clinicItem.addr}</p>
        <p>{clinicItem.telno}</p>
      </div>
    </div>
  );
};

export default MapContainer;
