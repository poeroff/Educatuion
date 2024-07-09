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
    backGroundColor: 'blue',
    chapterNum: 'Lesson 1. ',
    mainChapter: '\u00A0You and I Become “We”',
    subChapter: 'Intro',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.SECONDARY]: {
    backGroundColor: 'blue',
    chapterNum: 'Lesson 2. ',
    mainChapter: '\u00A0Open a Book, Open the World',
    subChapter: 'Write & Share',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.TERTIARY]: {
    backGroundColor: 'blue',
    chapterNum: 'Lesson 3. ',
    mainChapter: '\u00A0Free Yourself with Science',
    subChapter: 'Write & Share',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.QUATERNARY]: {
    backGroundColor: 'blue',
    chapterNum: 'Lesson 4. ',
    mainChapter: '\u00A0Let It Be Green',
    subChapter: 'Write & Share',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.PROJECT_CULTURE]: {
    backGroundColor: 'blue',
    chapterNum: 'Lesson 1. ',
    mainChapter: '\u00A0You and I Become “We”',
    subChapter: 'Project + Culture',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
};
