//변수명은 notion의 API명세서에 method+기능을 참고하였음.
const ACCESS_TOKEN_KEY_NAME = 'accessToken';

const requests = {
  //기본 URL 주소
  base_url: process.env.REACT_APP_USER_API,
  // user_api: 'http:localhost/8081',

  POST_REGISTER() {
    return this.base_url + `/users`;
  },
  POST_LOGIN() {
    return this.base_url + `/users/login`;
  },
  GET_USERS() {
    return this.base_url + `/users`;
  },
  GET_USERS_BY_OVSCD(ovsCd) {
    return this.base_url + `/users/${ovsCd}`;
  },
  PUT_UPDATE() {
    return this.base_url + `/users`;
  },
  DELETE_USER(deleteName) {
    return this.base_url + `/users/${deleteName}`;
  },
  SET_TOKEN(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
  },
  GET_TOKEN() {
    return localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  },
  REMOVE_TOKEN() {
    localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
  },
};

export default requests;
