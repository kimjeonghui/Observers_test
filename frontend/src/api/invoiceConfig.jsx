const requests = {
  //기본 URL 주소
  base_url: process.env.REACT_APP_INVOICE_API,

  GET_IVOICE_LIST(ovsCd, fiscalMonth) {
    return this.base_url + `/invoice/${ovsCd}/${fiscalMonth}`;
  },
  POST_INVOICE() {
    return this.base_url + `/invoice`;
  },
  POST_INVOICE_LIST() {
    return this.base_url + `/invoice/list`;
  },
  GET_INVOICE_STATUS_DATA(ovsCd, fiscalMonth, status) {
    return this.base_url + `/invoice/${ovsCd}/${fiscalMonth}/${status}`;
  },
  PATCH_INVOICE_STATUS_DATA(ovsCd, fiscalMonth) {
    return this.base_url + `/invoice/${ovsCd}/${fiscalMonth}`;
  },
};

export default requests;
