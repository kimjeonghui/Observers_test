const requests = {
  //기본 URL 주소
  base_url: process.env.REACT_APP_INVOICE_API,

  GET_IVOICE_LIST(ovsCd, fiscalMonth) {
    return this.base_url + `/invoice/${ovsCd}/${fiscalMonth}`;
  },
  POST_INVOICE() {
    return this.base_url + `/invoice`;
  },
};

export default requests;
