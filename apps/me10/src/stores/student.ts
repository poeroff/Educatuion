import { atom } from 'recoil';

export const studentAtom = atom({
  key: 'studentStates',
  default: {
    userId: 11222,
    schoolLevelCode: 'M',
    gradeLevelCode: '03',
    classBandCode: 'MAT',
    activeCardId: '',
  },
});
