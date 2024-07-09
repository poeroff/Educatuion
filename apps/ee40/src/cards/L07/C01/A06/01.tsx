import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L07/C01/A06/EE4-L07-C01-A06-P01-01.png',
      answerImgAlt: '7시를 나타내고 있는 시계',
    },
    {
      answerImgSrc: '/L07/C01/A06/EE4-L07-C01-A06-P01-02.png',
      answerImgAlt: '3시를 나타내고 있는 시계',
    },
  ],
};

const P01 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Listen and Do' },
        hQuestionInfo: { text: '1. 잘 듣고, 일치하는 시각을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L07/C01/A06/EE4-L07-C01-A06-P01.mp3', captionSrc: '/L07/C01/A06/EE4-L07-C01-A06-P01.srt' },
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
