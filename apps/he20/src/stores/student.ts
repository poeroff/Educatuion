import { atom } from 'recoil';

export const studentAtom = atom({
  key: 'studentStates',
  default: {
    userId: 212311121121123,
    schoolLevelCode: 'H',
    gradeLevelCode: '03',
    classBandCode: 'MAT',
    activeCardId: '',
  },
});
