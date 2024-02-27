const requests = {
  //식별코드관리 기본 URL 주소
  base_url: process.env.REACT_APP_GLCODE_API,

  GET_GLCODE_ALL() {
    return this.base_url + `/gl-code`;
  },
  GET_GLCODE_LIST_BY_MAJOR(majorCt) {
    return this.base_url + `/gl-code/major/${majorCt}`;
  },
  GET_GLCODE_LIST_BY_TRAN(tranCd) {
    return this.base_url + `/gl-code/major/${tranCd}`;
  },
  POST_GLCODE() {
    return this.base_url + `/gl-code`;
  },
  POST_GLCODE_LIST() {
    return this.base_url + `/gl-code/list`;
  },
  PUT_GLCODE_BY_ID(glCodeId) {
    return this.base_url + `/gl-code/${glCodeId}`;
  },
  DELET_GLCODE_BY_TRAN(tranCd) {
    return this.base_url + `/gl-code/delete/${tranCd}`;
  },
  DELET_GLCODE_BY_ID(glCodeId) {
    return this.base_url + `/gl-code/${glCodeId}`;
  },
};

export default requests;
