import { atom } from 'recoil';

export const loadingIndicatorAtom = atom({
  key: 'loadingIndicatorStates',
  default: {
    isShow: false,
    message: '진행 중이에요. 조금만 기다려주세요.',
  },
});
