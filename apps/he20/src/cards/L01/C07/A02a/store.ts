import { atom } from 'recoil';

export const L01C07A02 = atom({
  key: 'L01C07A02',
  default: {
    p01: {},
    p02: {
      answer1: '',
      answer2: '',
      solution1: ['animal', 'nimal'],
      solution2: ['care', 'are'],
      correctAnswers: ['1) nimal, are (animal, care도 정답 인정)'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      solution1: ['facility', 'acility'],
      solution2: ['food', 'ood'],
      correctAnswers: ['2) acility (facility도 정답 인정)', '3) ood(food도 정답 인정)'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer1: '',
      answer2: '',
      solution1: ['natural', 'atural'],
      solution2: ['instincts', 'nstincts'],
      correctAnswers: ['4) atural, nstincts (natural, instincts도 정답 인정)'],
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer1: '',
      solution1: ['rewards', 'ewards'],
      correctAnswers: ['5) ewards (rewards도 정답 인정)'],
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer1: '',
      answer2: '',
      solution1: ['water', 'ater'],
      solution2: ['harm', 'arm'],
      correctAnswers: ['6) ater (water도 정답 인정)', '7) arm (harm도 정답 인정)'],
      isCorrect: false,
      isSubmitted: false,
    },
    p07: {
      answer1: '',
      solution1: ['respect', 'espect'],
      correctAnswers: ['8) espect (respect도 정답 인정)'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
