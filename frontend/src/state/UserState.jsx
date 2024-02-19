import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'sessionStorage', //원하는 key 값 입력
  storage: sessionStorage,
});

export const userState = atom({
  key: 'userState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
