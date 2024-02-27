const requests = {
  //사무소관리 기본 URL 주소
  base_url: process.env.REACT_APP_OFFICE_API,

  GET_OFFICE_ALL() {
    return this.base_url + `/admin-office`;
  },
  GET_OFFICE_LIST_BY_CODE(ovsCd) {
    return this.base_url + `/admin-office/${ovsCd}`;
  },
  GET_OFFICE_NAME() {
    return this.base_url + `/admin-office/codeList`;
  },
  POST_OFFICE() {
    return this.base_url + `/admin-office`;
  },
  PUT_OFFICE() {
    return this.base_url + `/admin-office`;
  },
  DELETE_OFFICE(ovsCd) {
    return this.base_url + `/admin-office/${ovsCd}`;
  },
};

export default requests;
