import { atom } from 'recoil';

const A03000103State = atom({
  key: 'A03000103State',
  default: {
    p01: {
      checkList: [0, 0],
      isSubmitted: false,
    },
    p02: {
      checkList: [0, 0, 0, 0],
      ratingList: [0, 0, 0, 0],
      input: '',
      isSubmitted: false,
    },
  },
});

export default A03000103State;
