const requests = {
  //기본 URL 주소
  base_url: process.env.REACT_APP_ACCOUNTING_SLIP_API,

  POST_ACCOUNTING_SLIP(ovsCd, fiscalMonth) {
    return this.base_url + `/accountingSlips/${ovsCd}/${fiscalMonth}`;
  },
  GET_ACCOUNTING_SLIP(ovsCd, fiscalMonth) {
    return this.base_url + `/accountingSlips/${ovsCd}/${fiscalMonth}`;
  },
  GET_INVOICE_DATA(ovsCd, fiscalMonth, status) {
    return this.base_url + `/accountingSlips/${ovsCd}/${fiscalMonth}/${status}`;
  },
  PATCH_INVOICE_DATA(ovsCd, fiscalMonth, status) {
    return this.base_url + `/accountingSlips/${ovsCd}/${fiscalMonth}`;
  },
};
export default requests;
