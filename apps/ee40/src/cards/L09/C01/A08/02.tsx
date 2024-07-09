import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L09/C01/A08/EE4-L09-C01-A08-P02-01.png',
      answerImgAlt: '책상 위에 있는 손목시계',
    },
    {
      answerImgSrc: '/L09/C01/A08/EE4-L09-C01-A08-P02-02.png',
      answerImgAlt: '상자 안에 있는 손목시계',
    },
    {
      answerImgSrc: '/L09/C01/A08/EE4-L09-C01-A08-P02-03.png',
      answerImgAlt: '의자 아래에 있는 손목시계',
    },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Mission 1_Quiz 2' },
        hQuestionInfo: { text: '잘 듣고, 대화에 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L09/C01/A08/EE4-L09-C01-A08-P02.mp3', captionSrc: '/L09/C01/A08/EE4-L09-C01-A08-P02.srt' },
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
