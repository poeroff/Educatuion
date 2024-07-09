import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L09/C04/A04/EE4-L09-C04-A04-P01-01.png',
      answerImgAlt: '책상 아래에 있는 공',
    },
    {
      answerImgSrc: '/L09/C04/A04/EE4-L09-C04-A04-P01-02.png',
      answerImgAlt: '침대 위에 있는 공',
    },
  ],
};

const P01 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Review 1' },
        hQuestionInfo: { text: '1. 잘 듣고, 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L09/C04/A04/EE4-L09-C04-A04-P01.mp3', captionSrc: '/L09/C04/A04/EE4-L09-C04-A04-P01.srt' },
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
