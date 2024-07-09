import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L04/C04/A04/EE4-L04-C04-A04-P02-01.png',
      answerImgAlt: '급식을 받고 있는 남자아이를 식판으로 밀치는 여자아이',
    },
    {
      answerImgSrc: '/L04/C04/A04/EE4-L04-C04-A04-P02-02.png',
      answerImgAlt: '바이올린 연주회에서 떠들고 있는 여자아이들과 조용히 하라고 하는 남성',
    },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Review 1' },
        hQuestionInfo: { text: '2. 잘 듣고, 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L04/C04/A04/EE4-L04-C04-A04-P02.mp3', captionSrc: '/L04/C04/A04/EE4-L04-C04-A04-P02.srt' },
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
