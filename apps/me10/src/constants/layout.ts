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
    backGroundColor: 'purple',
    chapterNum: 'Unit 1.',
    mainChapter: 'Are You Ready?',
    subChapter: 'Intro',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.SECONDARY]: {
    backGroundColor: 'purple',
    chapterNum: 'Unit 2.',
    mainChapter: 'My Happy Life',
    subChapter: 'Intro',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.TERTIARY]: {
    backGroundColor: 'blue',
    chapterNum: 'Unit 3.',
    mainChapter: 'Be Open to Differences',
    subChapter: 'Intro',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.QUATERNARY]: {
    backGroundColor: 'blue',
    chapterNum: 'Unit 4. ',
    mainChapter: `Let's Travel Together!`,
    subChapter: 'Intro',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.QUINARY]: {
    backGroundColor: 'blue',
    chapterNum: 'Unit 5.',
    mainChapter: `Think Green, Live Green`,
    subChapter: 'Intro',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.SENARY]: {
    backGroundColor: 'blue',
    chapterNum: 'Unit 6.',
    mainChapter: `Dear Future Me`,
    subChapter: 'Intro',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.SEPTENARY]: {
    backGroundColor: 'blue',
    chapterNum: 'Unit 7.',
    mainChapter: `You Know What?`,
    subChapter: 'Intro',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.PROJECT_CULTURE]: {
    backGroundColor: 'blue',
    chapterNum: 'Lesson 1.',
    mainChapter: 'You and I Become “We”',
    subChapter: 'Project + Culture',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.SL1C01]: {
    backGroundColor: 'yellow',
    chapterNum: 'Special Reading 1.',
    mainChapter: '\u00A0The World of Picasso',
    subChapter: 'Read',
    minorChapter: '',
    headerPattern: 'text',
    headerText: 'Warm Up',
    footerInfo: {
      footerColorType: 'white',
    },
  },
  [ELayout.SL2C01]: {
    backGroundColor: 'yellow',
    chapterNum: 'Special Reading 2.',
    mainChapter: 'The King with Donkey Ears',
    subChapter: 'Read',
    minorChapter: '',
    headerPattern: 'text',
    headerText: '',
    footerInfo: {
      footerColorType: 'white',
    },
  },
};
