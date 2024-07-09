import { EMathLayout, TLayoutDataTypes } from '@maidt-cntn/ui';

export const layouts: TLayoutDataTypes = {
  [EMathLayout.DEFAULT]: {
    backGroundColor: 'blue',
    chapterNum: '1.',
    mainChapter: '대단원을 입력해 주세요 대단원을 입력해 주세요',
    subChapter: '중단원을 입력해 주세요 중단원을 입력해 주세요',
    minorChapter: '소단원을 입력해 주세요 소단원을 입력해 주세요',
    headerPattern: 'number', // "text" | "icon" | "number"
    headerText: '대제목을 입력해주세요',
    headerNumber: 1,
    iconType: 'teacher',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [EMathLayout.INTRO]: {
    backGroundColor: 'pink',
    chapterNum: '1.',
    mainChapter: '덧셈과 뺄셈',
    subChapter: '단원 도입',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [EMathLayout.SECONDARY]: {
    backGroundColor: 'blue',
    chapterNum: '1.',
    mainChapter: '덧셈과 뺄셈',
    subChapter: '함께하는 수학',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [EMathLayout.TERTIARY]: {
    backGroundColor: 'green',
    chapterNum: '1.',
    mainChapter: '덧셈과 뺄셈',
    subChapter: '해결하는 수학',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [EMathLayout.QUATERNARY]: {
    backGroundColor: 'brown',
    chapterNum: '1.',
    mainChapter: '덧셈과 뺄셈',
    subChapter: '문제로 마무리',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [EMathLayout.QUINARY]: {
    backGroundColor: 'yellow',
    chapterNum: '1.',
    mainChapter: '덧셈과 뺄셈',
    subChapter: '1. 세 자리 수의 덧셈을 해요(1)',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
};
