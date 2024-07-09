import { atom } from 'recoil';

export const L01C06A02 = atom<TA_L01_C06_A02>({
  key: 'L01C06A02',
  default: {
    p01: [
      { id: 1, word: 'survival kit', meaning: '생존 키트', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_survivalkit.mp3`, isMemorized: false },
      { id: 2, word: 'go away', meaning: '없어지다', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_goaway.mp3`, isMemorized: false },
      { id: 3, word: 'get hurt', meaning: '다치다', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_gethurt.mp3`, isMemorized: false },
      { id: 4, word: 'Band-Aid', meaning: '반창고', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_Band-Aid.mp3`, isMemorized: false },
      { id: 5, word: 'erase', meaning: '지우다', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_erase.mp3`, isMemorized: false },
      { id: 6, word: 'mirror', meaning: '거울', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_mirror.mp3`, isMemorized: false },
      { id: 7, word: 'mistake', meaning: '실수', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_mistake.mp3`, isMemorized: false },
      { id: 8, word: 'nervous', meaning: '불안해하는, 긴장하는', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_nervous.mp3`, isMemorized: false },
      { id: 9, word: 'remember', meaning: '기억하다', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_remember.mp3`, isMemorized: false },
      { id: 10, word: 'smile', meaning: '미소, 웃음', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_smile.mp3`, isMemorized: false },
      {
        id: 11,
        word: 'sticky note',
        meaning: '붙임쪽지,접착식 메모지',
        path: `/L01/C06/A02/ME1-L01-C06-A02-voca_stickynote.mp3`,
        isMemorized: false,
      },
      { id: 12, word: 'tightly', meaning: '꽉, 단단히', path: `/L01/C06/A02/ME1-L01-C06-A02-voca_tightly.mp3`, isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'get hurt', meaning: '다치다', meaningOrder: 5, isCorrect: false },
      { id: 2, word: 'tightly', meaning: '꽉, 단단히', meaningOrder: 9, isCorrect: false },
      { id: 3, word: 'nervous', meaning: '불안해하는', meaningOrder: 8, isCorrect: false },
      { id: 4, word: 'mirror', meaning: '거울', meaningOrder: 2, isCorrect: false },
      { id: 5, word: 'sticky note', meaning: '접착식 메모지', meaningOrder: 6, isCorrect: false },
      { id: 6, word: 'erase', meaning: '지우다', meaningOrder: 4, isCorrect: false },
      { id: 7, word: 'remember', meaning: '기억하다', meaningOrder: 3, isCorrect: false },
      { id: 8, word: 'mistake', meaning: '실수', meaningOrder: 10, isCorrect: false },
      { id: 9, word: 'smile', meaning: '미소, 웃음', meaningOrder: 7, isCorrect: false },
      { id: 10, word: 'Band-Aid', meaning: '반창고', meaningOrder: 1, isCorrect: false },
    ],
  },
});

type TA_L01_C06_A02 = {
  p01: TWordMemorizeData[];
  p02: TWordMatchData[];
};

type TWordData = {
  id: number;
  word: string;
  meaning: string;
};

type TWordMemorizeData = TWordData & {
  path: string;
  isMemorized: boolean;
};

type TWordMatchData = TWordData & {
  meaningOrder: number;
  isCorrect: boolean;
};
