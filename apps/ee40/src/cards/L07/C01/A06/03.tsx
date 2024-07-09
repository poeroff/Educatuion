import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L07/C01/A06/EE4-L07-C01-A06-P03-01.png',
      answerImgAlt: '1시 30분을 나타내고 있는 시계',
    },
    {
      answerImgSrc: '/L07/C01/A06/EE4-L07-C01-A06-P03-02.png',
      answerImgAlt: '2시 30분을 나타내고 있는 시계',
    },
    {
      answerImgSrc: '/L07/C01/A06/EE4-L07-C01-A06-P03-03.png',
      answerImgAlt: '3시 30분을 나타내고 있는 시계',
    },
  ],
};

const P03 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Listen and Do' },
        hQuestionInfo: { text: '3. 잘 듣고, 올바른 시각을 나타내고 있는 시계를 골라 봅시다.' },
        audioInfo: { audioSrc: '/L07/C01/A06/EE4-L07-C01-A06-P03.mp3', captionSrc: '/L07/C01/A06/EE4-L07-C01-A06-P03.srt' },
      }}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        subKey: 'NUMBER-03',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={{ answerInfo }}
    />
  );
};

export default P03;
