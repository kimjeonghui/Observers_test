//변수명은 notion의 API명세서에 method+기능을 참고하였음.

const summaryRq = {
  //기본 URL 주소
  base_url: process.env.REACT_APP_SUMMARY_API,

  POST_SUMMARY() {
    return this.base_url + `/summary`;
  },
  GET_SUMMARY(ovsCd, fiscalMonth) {
    return this.base_url + `/summary/${ovsCd}/${fiscalMonth}`;
  },
};

export default summaryRq;
