import { atom } from 'recoil';

export const tokenAtom = atom<{
  accessToken: string;
}>({
  key: 'tokenStates',
  default: {
    accessToken: '',
  },
});
