//fetch를 처리해주는 함수를 만들어서 export
import { API_BASE_URL } from '../app-config';

//method = "GET", "POST", "PUT", "DELETE"
//request는 백엔드로 보내줄 데이터
export function call(api, method, request) {
  let headers = new Headers({
    'Content-Type': 'application/json',
  });
  //sessionStorage에서 토큰 값 가져오기
  const accessToken = sessionStorage.getItem('ACCESS_TOKEN');

  //sessionStorage에서 토큰 값 존재하면 헤더에 담아서 API 호출
  if (accessToken && accessToken !== null) {
    headers.append('Authorization', 'Bearer' + accessToken);
  }

  //fetch 옵션 설정
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  //보내줄 데이터가 있으면
  //request 바디에 담기
  if (request) {
    options.body = JSON.stringify(request);
  }

  //fetch 실행 후 결과 값 리턴
  return fetch(options.url, options).then((response) => {
    if (response.status === 403) {
      window.location.href = '/login'; //백에서 가져올때만 /api/ 붙임
    }

    response.json().then((json) => {
      //api 오류 시 에러 리턴
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
  });
}

//회원가입
export function join(member) {
  return call('/api/member/join', 'POST', member);
}

//로그인
export function login(member) {
  return call('/api/member/login', 'POST', member).then((response) => {
    console.log(response);
    alert(response.token);
    //토큰이 존재하면 Map으로 이동
    if (response.token) {
      //로그인 성공 시 sessionStorage에 토큰 값 저장
      sessionStorage.setItem('ACCESS_TOKEN', response.token);
      window.location.href = '/';
    }
  });
}
