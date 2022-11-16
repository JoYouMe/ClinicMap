let backendHost;

const hostname = window.location && window.location.hostname; //마지막 값이 변수에 담김

if (hostname === 'localhost') {
  backendHost = 'http://localhost:8080';
}

export const API_BASE_URL = `${backendHost}`;
