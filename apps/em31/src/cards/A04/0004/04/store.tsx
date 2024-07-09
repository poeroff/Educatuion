import { atom } from 'recoil';

export const A04000404_Atom = atom({
  key: 'A04000404',
  default: {
    p02: {
      answer2: {
        // 첫번째 줄 1의 자리
        value: '',
        isCorrect: false,
      },
      answer3: {
        // 첫번째 줄 10의 자리
        value: '',
        isCorrect: false,
      },
      answer4: {
        // 첫번째 줄 100의 자리
        value: '',
        isCorrect: false,
      },
      answer5: {
        // 두번째 줄 1의 자리
        value: '',
        isCorrect: false,
      },
      answer6: {
        // 두번째 줄 10의 자리
        value: '',
        isCorrect: false,
      },
      answer7: {
        // 두번째 줄 100의 자리
        value: '',
        isCorrect: false,
      },
      solution2: '0', // 첫번째 줄 1의 자리
      solution3: '2', // 첫번째 줄 10의 자리
      solution4: '1', // 두번째 줄 100의 자리
      solution5: '3', // 두번째 줄 1의 자리
      solution6: '2', // 두번째 줄 10의 자리
      solution7: '1', // 두번째 줄 100의 자리
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
