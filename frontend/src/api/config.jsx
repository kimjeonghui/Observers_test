//변수명은 notion의 API명세서에 method+기능을 참고하였음.

const requests = {
  //기본 URL 주소
  base_url: process.env.REACT_APP_USER_API,
  // user_api: 'http:localhost/8081',

  POST_REGISTER() {
    return `/users/register`;
  },
  POST_LOGIN() {
    return `/users/login`;
  },
};

export default requests;
