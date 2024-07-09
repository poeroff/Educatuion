// Page: EE4-L10-C04-A04-P01

import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L10/C04/A04/EE4-L10-C04-A04-P01-01.JPG',
      answerImgAlt: '빨간색 짧은 드레스',
    },
    {
      answerImgSrc: '/L10/C04/A04/EE4-L10-C04-A04-P01-02.JPG',
      answerImgAlt: '긴 코트',
    },
  ],
};

const P01 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Review 1' },
        hQuestionInfo: { text: '1. 잘 듣고, 여자아이의 물건을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L10/C04/A04/EE4-L10-C04-A04-P01.mp3', captionSrc: '/L10/C04/A04/EE4-L10-C04-A04-P01.srt' },
      }}
      pageData={{
        pageNumber: 1,
        mainKey: 1,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={{ answerInfo }}
    />
  );
};

export default P01;
