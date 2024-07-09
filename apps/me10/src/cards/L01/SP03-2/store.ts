import { atom } from 'recoil';

export const L01SCP0302 = atom<TL01SCP0302>({
  key: 'L01SCP0302',
  default: {
    p05: {
      answer: '',
      solution: '생존 키트',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      solution: '미소, 웃음',
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      answer: '',
      solution: 'erase',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: '',
      solution: 'write',
      isCorrect: false,
      isSubmitted: false,
    },
    p16: {
      chipButtonInfo: [
        {
          text: '이 반창고가',
        },
        {
          text: '그러나',
        },
        {
          text: '괜찮아요.',
        },
        {
          text: '있으면,',
        },
      ],
      answer: [
        {
          text: '그러나',
        },
        {
          text: '이 반창고가',
        },
        {
          text: '있으면,',
        },
        {
          text: '괜찮아요.',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p17: {
      chipButtonInfo: [
        {
          text: '저는',
        },
        {
          text: '보고',
        },
        {
          text: '“그냥 너답게 해!"라고',
        },
        {
          text: '거울을',
        },
        {
          text: '말해요.',
        },
      ],
      answer: [
        {
          text: '저는',
        },
        {
          text: '거울을',
        },
        {
          text: '보고',
        },
        {
          text: '“그냥 너답게 해!"라고',
        },
        {
          text: '말해요.',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p20: {
      chipButtonInfo: [
        {
          text: 'Now',
        },
        {
          text: 'your',
        },
        {
          text: 'make',
        },
        {
          text: 'own',
        },
        {
          text: 'survival kit.',
        },
      ],
      answer: [
        {
          text: 'Now',
        },
        {
          text: 'make',
        },
        {
          text: 'your',
        },
        {
          text: 'own',
        },
        {
          text: 'survival kit.',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
    p21: {
      chipButtonInfo: [
        {
          text: 'write',
        },
        {
          text: 'remember',
        },
        {
          text: 'I',
        },
        {
          text: 'and',
        },
        {
          text: 'them.',
        },
        {
          text: 'your names',
        },
      ],
      answer: [
        {
          text: 'I',
        },
        {
          text: 'write',
        },
        {
          text: 'your names',
        },
        {
          text: 'and',
        },
        {
          text: 'remember',
        },
        {
          text: 'them.',
        },
      ],
      clickedChipButtons: [] as number[],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL01SCP0302 = {
  p05: TOneWordMatchData;
  p06: TOneWordMatchData;
  p09: TOneWordMatchData;
  p10: TOneWordMatchData;
  p16: TChipData;
  p17: TChipData;
  p20: TChipData;
  p21: TChipData;
};

type TChipData = {
  chipButtonInfo: TWord[];
  answer: TWord[];
  clickedChipButtons: number[];
  isSubmitted: boolean;
  isCorrect: boolean;
};

type TWord = {
  text: string;
};

type TOneWordMatchData = {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};
