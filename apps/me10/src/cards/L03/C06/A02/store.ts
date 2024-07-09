import { atom } from 'recoil';

const wordData: TWordData[] = [
  { id: 1, word: 'practice', meaning: '연습', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_practice.mp3` },
  { id: 2, word: 'exciting', meaning: '흥미진진한, 재미있는', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_exciting.mp3` },
  { id: 3, word: 'welcome', meaning: '환영하다, 맞이하다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_welcome.mp3` },
  { id: 4, word: 'shout', meaning: '소리치다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_shout.mp3` },
  { id: 5, word: 'believe', meaning: '믿다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_believe.mp3` },
  { id: 6, word: 'play fetch', meaning: '페치(공 물어 오기 놀이)를 하다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_playfetch.mp3` },
  { id: 7, word: 'silently', meaning: '조용히', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_silently.mp3` },
  { id: 8, word: 'go over', meaning: '넘어가다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_goover.mp3` },
  { id: 9, word: 'fence', meaning: '울타리, 담', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_fence.mp3` },
  { id: 10, word: 'bump into', meaning: '부딪히다, 충돌하다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_bumpinto.mp3` },
  { id: 11, word: 'fall down', meaning: '넘어지다, 떨어지다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_falldown.mp3` },
  { id: 12, word: 'jump into the air', meaning: '공중으로 뛰어오르다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_jumpintotheair.mp3` },
  { id: 13, word: 'pass', meaning: '건네주다, 지나가다', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_pass.mp3` },
  { id: 14, word: 'surprised', meaning: '놀란', path: `/L03/C06/A02/ME1-L03-C06-A02-voca_surprised.mp3` },
];

export const L03C06A02 = atom<TA_L03_C06_A02>({
  key: 'L03C06A02',
  default: {
    p01: wordData.map(data => ({ ...data, isMemorized: false })),
    p02: wordData
      .map(data => ({ ...data, meaningOrder: Math.round(Math.random() * wordData.length), isCorrect: false }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10),
  },
});

type TA_L03_C06_A02 = {
  p01: TWordMemorizeData[];
  p02: TWordMatchData[];
};

type TWordData = {
  id: number;
  word: string;
  meaning: string;
  path: string;
};

type TWordMemorizeData = TWordData & {
  isMemorized: boolean;
};

type TWordMatchData = TWordData & {
  meaningOrder: number;
  isCorrect: boolean;
};
