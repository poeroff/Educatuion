// Page: EE4-L12-C01-A06-P01

import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L12/C01/A06/EE4-L12-C01-A06-P01-01.png',
      answerImgAlt: '피아노',
    },
    {
      answerImgSrc: '/L12/C01/A06/EE4-L12-C01-A06-P01-02.png',
      answerImgAlt: '축구공',
    },
    {
      answerImgSrc: '/L12/C01/A06/EE4-L12-C01-A06-P01-03.png',
      answerImgAlt: '극장 스크린, 팝콘, 콜라, 3D 안경',
    },
  ],
};

const P01 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Listen and Do' },
        hQuestionInfo: { text: '1. 잘 듣고, 친구의 주말 여가 활동을 골라 봅시다.' },
        audioInfo: {
          audioSrc: '/L12/C01/A06/EE4-L12-C01-A06-P01.mp3',
          captionSrc: '/L12/C01/A06/EE4-L12-C01-A06-P01.srt'
        },
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
