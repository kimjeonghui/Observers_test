const requests = {
  //기본 URL 주소
  base_url: process.env.REACT_APP_OCR_SERVER_URL,

  POST_OCR_UPLOAD() {
    return this.base_url + `/upload`;
  },
};

export default requests;
