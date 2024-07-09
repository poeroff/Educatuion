import { ELayout, TLayoutDataTypes } from '@maidt-cntn/ui';

export const layouts: TLayoutDataTypes = {
  [ELayout.DEFAULT]: {
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
  [ELayout.INTRO]: {
    backGroundColor: 'white',
    chapterNum: '',
    mainChapter: '',
    subChapter: '',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.SECONDARY]: {
    backGroundColor: 'blue',
    chapterNum: 'I.',
    mainChapter: '다항식',
    subChapter: '1. 다항식의 연산',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.TERTIARY]: {
    backGroundColor: 'pink',
    chapterNum: 'I.',
    mainChapter: '다항식',
    subChapter: '1. 다항식의 연산',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.QUATERNARY]: {
    backGroundColor: 'orange',
    chapterNum: 'I.',
    mainChapter: '다항식',
    subChapter: '1. 다항식의 연산',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.QUINARY]: {
    backGroundColor: 'img_pink',
    chapterNum: 'I.',
    mainChapter: '다항식',
    subChapter: '1. 다항식의 연산',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.SENARY]: {
    backGroundColor: 'img_blue',
    chapterNum: 'I.',
    mainChapter: '다항식',
    subChapter: '1. 다항식의 연산',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
};
