import { atom } from 'recoil';

export const A05040505_store = atom({
  key: 'A05040505',
  default: {
    P04: {
      solution: ['기준이 되는 거리의 몇 배가 되는지 어림하여 주어진 거리를 어림합니다.', '기준이 되는 거리를 찾아 비교하여 거리를 어림합니다.'],
      canvasPath1: '',
      isSubmitted: false,
    },
  },
});
