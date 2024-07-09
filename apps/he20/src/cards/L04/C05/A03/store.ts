import { atom } from 'recoil';

export const L04C05A03 = atom<TL04C05A03>({
  key: 'L04C05A03',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'following a particular rule or standard' },
        { text: 'to hold someone tightly, or accept an idea completely' },
        { text: 'a device that is inserted into the body through a medical operation' },
      ],
      context: 'The hearing implant helped the patient with hearing difficulties.',
      underlineText: 'implant',
    },
    p02: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'to hold someone tightly, or accept an idea completely' },
        { text: 'to bring about a significant change in an industry or an aspect of life' },
        { text: 'to combine or bring different parts or elements together into a whole' },
      ],
      context: 'A company needs to embrace innovation to survive in these rapidly changing times.',
      underlineText: 'embrace',
    },
    p03: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'to hold someone tightly, or accept an idea completely' },
        { text: 'to bring about a significant change in an industry or an aspect of life' },
        { text: 'to combine or bring different parts or elements together into a whole' },
      ],
      context: 'Recent school programs seek to revolutionize learning by offering interactive lessons.',
      underlineText: 'revolutionize',
    },
    p04: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'following a particular rule or standard' },
        { text: 'to hold someone tightly, or accept an idea completely' },
        { text: 'a device that is inserted into the body through a medical operation' },
      ],
      context: 'All employees are expected to dress in accordance with the company’s dress code policy.',
      underlineText: 'in accordance with',
    },
    p05: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
      data: [
        { text: 'to hold someone tightly, or accept an idea completely' },
        { text: 'to bring about a significant change in an industry or an aspect of life' },
        { text: 'to combine or bring different parts or elements together into a whole' },
      ],
      context: 'Today’s hanok shows how to integrate both traditional and modern elements successfully.',
      underlineText: 'integrate',
    },
  },
});

type TL04C05A03 = {
  p01: IL04C05A03;
  p02: IL04C05A03;
  p03: IL04C05A03;
  p04: IL04C05A03;
  p05: IL04C05A03;
};

interface IL04C05A03 {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
  data: { text: string }[];
  context: string;
  underlineText: string;
}
