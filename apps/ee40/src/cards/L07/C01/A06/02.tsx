import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L07/C01/A06/EE4-L07-C01-A06-P02-01.png',
      answerImgAlt: '10시를 나타내고 있는 시계',
    },
    {
      answerImgSrc: '/L07/C01/A06/EE4-L07-C01-A06-P02-02.png',
      answerImgAlt: '11시를 나타내고 있는 시계',
    },
    {
      answerImgSrc: '/L07/C01/A06/EE4-L07-C01-A06-P02-03.png',
      answerImgAlt: '12시를 나타내고 있는 시계',
    },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Listen and Do' },
        hQuestionInfo: { text: '2. 잘 듣고, 올바른 시각을 나타내고 있는 시계를 골라 봅시다.' },
        audioInfo: { audioSrc: '/L07/C01/A06/EE4-L07-C01-A06-P02.mp3', captionSrc: '/L07/C01/A06/EE4-L07-C01-A06-P02.srt' },
      }}
      pageData={{
        pageNumber: 2,
        mainKey: 2,
        subKey: 'NUMBER-02',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={{ answerInfo }}
    />
  );
};

export default P02;
