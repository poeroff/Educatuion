import { atom } from 'recoil';

export const timerAtom = atom({
  key: 'timerStates',
  default: {
    seconds: 600,
    isVisible: false,
    isRunningTimer: false,
  },
});

export const appropriateTime = atom<number>({
  key: 'appropriateTime',
  default: 0,
});

export const durationTimer = atom<number>({
  key: 'durationTimer',
  default: 0,
});

export const isRunningTimer = atom<boolean>({
  key: 'isRunningTimer',
  default: false,
});
