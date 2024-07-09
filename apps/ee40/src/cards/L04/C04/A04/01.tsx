import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L04/C04/A04/EE4-L04-C04-A04-P01-01.png',
      answerImgAlt: '헬멧을 쓰지 않고 자전거를 타고 있는 아이와 헬멧을 들고 아이에게 말을 하는 여성',
    },
    {
      answerImgSrc: '/L04/C04/A04/EE4-L04-C04-A04-P01-02.png',
      answerImgAlt: '막혀 있는 지하철 개찰구로 들어가려고 하는 아이와 이를 막는 직원',
    },
  ],
};

const P01 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Review 1' },
        hQuestionInfo: { text: '1. 잘 듣고, 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L04/C04/A04/EE4-L04-C04-A04-P01.mp3', captionSrc: '/L04/C04/A04/EE4-L04-C04-A04-P01.srt' },
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
