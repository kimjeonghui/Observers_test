const requests = {
  base_url: process.env.REACT_APP_EXCHANGE_API,

  GET_EXCHANGE_RATE_ALL() {
    return this.base_url + `/exchange-rate`;
  },
  GET_EXCHANGE_FROM_TO(from, to) {
    return this.base_url + `/exchange-rate/${from}/${to}`;
  },
  GET_EXCHANGE_FROM(from) {
    return this.base_url + `/exchange-rate/from/${from}`;
  },
  GET_EXCHANGE_TO(to) {
    return this.base_url + `/exchange-rate/to/${to}`;
  },
};

export default requests;
