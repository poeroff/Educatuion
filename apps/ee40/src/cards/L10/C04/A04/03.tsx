// Page: EE4-L10-C04-A04-P03

import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L10/C04/A04/EE4-L10-C04-A04-P03-01.JPG',
      answerImgAlt: '빨간색 모자',
    },
    {
      answerImgSrc: '/L10/C04/A04/EE4-L10-C04-A04-P03-02.JPG',
      answerImgAlt: '파란색 스카프',
    },
  ],
};

const P03 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Review 1' },
        hQuestionInfo: { text: '3. 잘 듣고, 여자아이의 물건을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L10/C04/A04/EE4-L10-C04-A04-P03.mp3', captionSrc: '/L10/C04/A04/EE4-L10-C04-A04-P03.srt' },
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

export default P03;
