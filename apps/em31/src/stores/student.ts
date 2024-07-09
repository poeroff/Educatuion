import { atom } from 'recoil';

export const studentAtom = atom({
  key: 'studentStates',
  default: {
    userId: 11611,
    schoolLevelCode: 'H',
    gradeLevelCode: '03',
    classBandCode: 'MAT',
    activeCardId: '',
  },
});
