import { atom } from 'recoil';

const wordData: TWordData[] = [
  { id: 1, word: 'both', meaning: '둘 다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_both.mp3` },
  { id: 2, word: 'comic', meaning: '만화책', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_comic.mp3` },
  { id: 3, word: 'present', meaning: '현재의', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_present.mp3` },
  { id: 4, word: 'look at', meaning: '~을 보다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_lookat.mp3` },
  { id: 5, word: 'alarm clock', meaning: '자명종', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_alarmclock.mp3` },
  { id: 6, word: 'go off', meaning: '울리다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_gooff.mp3` },
  { id: 7, word: 'look out  ', meaning: '내다보다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_lookout.mp3` },
  { id: 8, word: 'lunchbox', meaning: '도시락', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_lunchbox.mp3` },
  { id: 9, word: 'backpack', meaning: '배낭, 책가방', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_backpack.mp3` },
  { id: 10, word: 'grab', meaning: '쥐다, 부여잡다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_grab.mp3` },
  {
    id: 11,
    word: 'get ready for',
    meaning: '~에 대비하다, ~에 대한 준비를 하다',
    path: `/L02/C06/A02/ME1-L02-C06-A02-voca_getreadyfor.mp3`,
  },
  {
    id: 12,
    word: 'tablet',
    meaning: '태블릿 피시(화면을 터치하는 휴대용 컴퓨터)',
    path: `/L02/C06/A02/ME1-L02-C06-A02-voca_tablet.mp3`,
  },
  { id: 13, word: 'wait for  ', meaning: '~을 기다리다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_waitfor.mp3` },
  { id: 14, word: 'coin', meaning: '동전', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_coin.mp3` },
  { id: 15, word: 'take out', meaning: '꺼내다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_takeout.mp3` },
  { id: 16, word: 'get on  ', meaning: '타다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_geton.mp3` },
  { id: 17, word: 'empty', meaning: '빈', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_empty.mp3` },
  { id: 18, word: 'seat', meaning: '자리', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_seat.mp3` },
  { id: 19, word: 'comic book', meaning: '만화책', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_comicbook.mp3` },
  { id: 20, word: 'webtoon', meaning: '웹툰', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_webtoon.mp3` },
  { id: 21, word: 'show', meaning: '쇼, 프로그램', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_show.mp3` },
  { id: 22, word: 'record', meaning: '녹음하다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_record.mp3` },
  { id: 23, word: 'tape', meaning: '테이프', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_tape.mp3` },
  { id: 24, word: 'letter', meaning: '편지', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_letter.mp3` },
  { id: 25, word: 'request', meaning: '요청하다, 신청하다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_request.mp3` },
  { id: 26, word: 'rap', meaning: '랩', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_rap.mp3` },
  { id: 27, word: 'share', meaning: '공유하다', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_share.mp3` },
  { id: 28, word: 'social media', meaning: '소셜 미디어', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_socialmedia.mp3` },
  { id: 29, word: 'bedtime', meaning: '취침 시간', path: `/L02/C06/A02/ME1-L02-C06-A02-voca_bedtime.mp3` },
];

export const L02C06A02 = atom<TA_L02_C06_A02>({
  key: 'L02C06A02',
  default: {
    p01: wordData.map(data => ({ ...data, isMemorized: false })),
    p02: wordData
      .map(data => ({ ...data, meaningOrder: Math.round(Math.random() * wordData.length), isCorrect: false }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10),
  },
});

type TA_L02_C06_A02 = {
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
