import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C10A02 = atom({
  key: 'L01C10A02',
  default: {
    p01: {
      answer: ['', '', '', '', ''],
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', '', '', ''],
      isSubmitted: false,
    },
    p03: {
      answer: ['', ''],
      isSubmitted: false,
    },
  },
});

export const L01C10A02HeaderInfo: TMainHeaderInfoTypes = {
  headerText: 'My School Life',
};

export const L01C10A02TableHeader = [
  { thText: '학교 이름', eg: 'e.g. Hanguk' },
  { thText: '학교 가는 방법', eg: 'walk' },
  { thText: '반 친구들', eg: 'nice' },
  { thText: '가장 좋아하는 시간/과목', eg: 'lunch time' },
  { thText: '가장 좋아하는 급식 메뉴', eg: 'bibimbap' },
];
