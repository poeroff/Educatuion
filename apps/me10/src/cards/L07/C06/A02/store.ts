import { atom } from 'recoil';

const wordData: TWordData[] = [
  { id: 1, word: 'fact', meaning: '사실', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_fact.mp3` },
  { id: 2, word: 'host', meaning: '사회자, 진행자', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_host.mp3` },
  { id: 3, word: 'finalist', meaning: '결승전 출전자', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_finalist.mp3` },
  { id: 4, word: `do one's best`, meaning: '최선을 다하다', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_doones_best.mp3` },
  { id: 5, word: 'receive', meaning: '받다', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_receive.mp3` },
  { id: 6, word: 'desert', meaning: '사막', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_desert.mp3` },
  { id: 7, word: 'Antarctica', meaning: '남극 대륙', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_Antarctica.mp3` },
  { id: 8, word: 'sandy', meaning: '모래로 뒤덮인', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_sandy.mp3` },
  { id: 9, word: 'above', meaning: '~위에', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_above.mp3` },
  { id: 10, word: 'sea level', meaning: '해수면', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_sealevel.mp3` },
  { id: 11, word: 'below', meaning: '~아래에', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_below.mp3` },
  { id: 12, word: 'bottom', meaning: '맨 아래, 바닥', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_bottom.mp3` },
  { id: 13, word: 'final ', meaning: '마지막의, 최후의', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_final.mp3` },
  { id: 14, word: 'map', meaning: '지도', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_map.mp3` },
  { id: 15, word: 'close to', meaning: '~와 가까운', path: `/L07/C06/A02/ME1-L07-C06-A02-voca_closeto.mp3` },
];

export const L07C06A02 = atom<TA_L07_C06_A02>({
  key: 'L07C06A02',
  default: {
    p01: wordData.map(data => ({ ...data, isMemorized: false })),
    p02: wordData
      .map(data => ({ ...data, meaningOrder: Math.round(Math.random() * wordData.length), isCorrect: false }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10),
  },
});

type TA_L07_C06_A02 = {
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
