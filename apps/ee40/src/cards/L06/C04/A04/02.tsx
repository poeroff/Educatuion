import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L06/C04/A04/EE4-L06-C04-A04-P02-01.png',
      answerImgAlt: '헤드셋을 끼고 음악을 듣고 있는 아이',
    },
    {
      answerImgSrc: '/L06/C04/A04/EE4-L06-C04-A04-P02-02.png',
      answerImgAlt: '로봇을 조립하고 있는 아이',
    },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Review 1' },
        hQuestionInfo: { text: '2. 잘 듣고, 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L06/C04/A04/EE4-L06-C04-A04-P02.mp3', captionSrc: '/L06/C04/A04/EE4-L06-C04-A04-P02.srt' },
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
