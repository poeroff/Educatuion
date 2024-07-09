// Page: EE4-L11-C04-A04-P02

import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L11/C04/A04/EE4-L11-C04-A04-P02-01.png',
      answerImgAlt: '7일 수요일을 나타내는 달력, 축구하는 아이',
    },
    {
      answerImgSrc: '/L11/C04/A04/EE4-L11-C04-A04-P02-02.png',
      answerImgAlt: '7일 수요일을 나타내는 달력, 책을 읽는 아이',
    },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Review 1' },
        hQuestionInfo: { text: '2. 잘 듣고, 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L11/C04/A04/EE4-L11-C04-A04-P02.mp3', captionSrc: '/L11/C04/A04/EE4-L11-C04-A04-P02.srt' },
      }}
      pageData={{
        pageNumber: 2,
        mainKey: 2,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={{ answerInfo }}
    />
  );
};

export default P02;
