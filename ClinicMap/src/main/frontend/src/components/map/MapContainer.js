import React, { useEffect } from 'react';

// window 전역 객체에 들어간 kakao 객체를 사용
const { kakao } = window;

const MapContainer = () => {
  useEffect(() => {
    const container = document.getElementById('kakaoMap'); // 지도를 담을 역역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // HTML5의 geolocaiton으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옴
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPostion = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation 좌표로 생성
          message = '<div style="padding:5px;">🚩현위치입니다</div>'; // 인포윈도우에 표시

        // 마커와 인포윈도우를 표시
        displayMarker(locPostion, message);
      });
    } else {
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수
    function displayMarker(locPostion, message) {
      // 마커 생성
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPostion,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우 생성
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경
      map.setCenter(locPostion);
    }
  }, []);

  return (
    <div
      id="kakaoMap"
      style={{
        width: '500px',
        height: '500px',
      }}
    ></div>
  );
};

export default MapContainer;
