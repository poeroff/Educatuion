import { atom } from 'recoil';

export const audioState = atom<number>({
  key: 'audioState',
  default: 0,
});
