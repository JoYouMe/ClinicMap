let backendHost;

const hostname = window && window.location && window.location.hostname; //마지막 값이 변수에 담김

backendHost = `https://${hostname}:8080`;
//backendHost = `https://clinicmap.yuum.link:8080`;

export const API_BASE_URL = `${backendHost}`;
