import { atom } from 'recoil';

export const HE10L04C05A04 = atom<THE10L04C05A04>({
  key: 'HE10L04C05A04',
  default: {
    p01: [
      { id: 1, word: 'sentiment', meaning: '정서, 감정', isMemorized: false },
      { id: 2, word: 'spring up', meaning: '휙 나타나다', isMemorized: false },
      { id: 3, word: 'approximately', meaning: '대략적으로', isMemorized: false },
      { id: 4, word: 'consume', meaning: '소모하다', isMemorized: false },
      { id: 5, word: 'necessity', meaning: '필요성', isMemorized: false },
      { id: 6, word: 'substantial', meaning: '상당한', isMemorized: false },
      { id: 7, word: 'extraction', meaning: '추출', isMemorized: false },
      { id: 8, word: 'dispose of', meaning: '~을 처리하다', isMemorized: false },
      { id: 9, word: 'vast', meaning: '어마어마한', isMemorized: false },
      { id: 10, word: 'quantity', meaning: '양', isMemorized: false },
      { id: 11, word: 'landfill', meaning: '쓰레기 매립지', isMemorized: false },
      { id: 12, word: 'release', meaning: '놓아 주다', isMemorized: false },
      { id: 13, word: 'potent', meaning: '강한', isMemorized: false },
      { id: 14, word: 'incinerate', meaning: '소각하다', isMemorized: false },
      { id: 15, word: 'take into account', meaning: '~을 고려하다', isMemorized: false },
      { id: 16, word: 'compound', meaning: '복합체', isMemorized: false },
      { id: 17, word: 'measure', meaning: '측정하다', isMemorized: false },
      { id: 18, word: 'collaborate', meaning: '협력하다', isMemorized: false },
      { id: 19, word: 'impurity', meaning: '불순물', isMemorized: false },
      { id: 20, word: 'fertilizer', meaning: '비료', isMemorized: false },
      { id: 21, word: 'transform', meaning: '변형시키다', isMemorized: false },
      { id: 22, word: 'repurpose', meaning: '다른 용도에 맞게 만들다', isMemorized: false },
      { id: 23, word: 'fabric', meaning: '직물, 천', isMemorized: false },
      { id: 24, word: 'absorb', meaning: '흡수하다', isMemorized: false },
      { id: 25, word: 'take steps', meaning: '조치를 취하다', isMemorized: false },
      { id: 26, word: 'sustainable', meaning: '지속 가능한', isMemorized: false },
      { id: 27, word: 'dedicate ~ to …', meaning: '~을 …에 바치다', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'consume', meaning: '소모하다', meaningOrder: 7, isCorrect: false },
      { id: 2, word: 'approximately', meaning: '대략적으로', meaningOrder: 5, isCorrect: false },
      { id: 3, word: 'substantial', meaning: '상당한', meaningOrder: 1, isCorrect: false },
      { id: 4, word: 'dispose of', meaning: '~을 처리하다', meaningOrder: 4, isCorrect: false },
      { id: 5, word: 'vast', meaning: '어마어마한', meaningOrder: 3, isCorrect: false },
      { id: 6, word: 'sentiment', meaning: '정서, 감정', meaningOrder: 2, isCorrect: false },
      { id: 7, word: 'extraction', meaning: '추출', meaningOrder: 10, isCorrect: false },
      { id: 8, word: 'quantity', meaning: '양', meaningOrder: 8, isCorrect: false },
      { id: 9, word: 'necessity', meaning: '필요성', meaningOrder: 9, isCorrect: false },
      { id: 10, word: 'spring up', meaning: '휙 나타나다', meaningOrder: 6, isCorrect: false },
    ],
    p03: [
      { id: 1, word: 'compound', meaning: '복합체', meaningOrder: 8, isCorrect: false },
      { id: 2, word: 'release', meaning: '놓아 주다', meaningOrder: 10, isCorrect: false },
      { id: 3, word: 'potent', meaning: '강한', meaningOrder: 5, isCorrect: false },
      { id: 4, word: 'collaborate', meaning: '협력하다', meaningOrder: 4, isCorrect: false },
      { id: 5, word: 'fertilizer', meaning: '비료', meaningOrder: 9, isCorrect: false },
      { id: 6, word: 'measure', meaning: '측정하다', meaningOrder: 7, isCorrect: false },
      { id: 7, word: 'impurity', meaning: '불순물', meaningOrder: 6, isCorrect: false },
      { id: 8, word: 'incinerate', meaning: '소각하다', meaningOrder: 2, isCorrect: false },
      { id: 9, word: 'landfill', meaning: '쓰레기 매립지', meaningOrder: 1, isCorrect: false },
      { id: 10, word: 'take into account', meaning: '~을 고려하다', meaningOrder: 3, isCorrect: false },
    ],
    p04: [
      { id: 1, word: 'extraction', meaning: '추출', meaningOrder: 8, isCorrect: false },
      { id: 2, word: 'impurity', meaning: '불순물', meaningOrder: 4, isCorrect: false },
      { id: 3, word: 'transform', meaning: '변형시키다', meaningOrder: 6, isCorrect: false },
      { id: 4, word: 'dispose of', meaning: '~을 처리하다', meaningOrder: 9, isCorrect: false },
      { id: 5, word: 'quantity', meaning: '양', meaningOrder: 2, isCorrect: false },
      { id: 6, word: 'collaborate', meaning: '협력하다', meaningOrder: 5, isCorrect: false },
      { id: 7, word: 'repurpose', meaning: '다른 용도에 맞게 만들다', meaningOrder: 1, isCorrect: false },
      { id: 8, word: 'release', meaning: '놓아 주다', meaningOrder: 10, isCorrect: false },
      { id: 9, word: 'incinerate', meaning: '소각하다', meaningOrder: 3, isCorrect: false },
      { id: 10, word: 'absorb', meaning: '흡수하다', meaningOrder: 7, isCorrect: false },
    ],
  },
});

type THE10L04C05A04 = {
  p01: TWordMemorizeData[];
  p02: TWordMatchData[];
  p03: TWordMatchData[];
  p04: TWordMatchData[];
};

type TWordData = {
  id: number;
  word: string;
  meaning: string;
};

type TWordMemorizeData = TWordData & {
  isMemorized: boolean;
};

type TWordMatchData = TWordData & {
  meaningOrder: number;
  isCorrect: boolean;
};
