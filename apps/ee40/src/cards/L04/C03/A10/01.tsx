import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L04/C03/A10/EE4-L04-C03-A10-P01-01.png',
      answerImgAlt: 'a. 가방',
    },
    {
      answerImgSrc: '/L04/C03/A10/EE4-L04-C03-A10-P01-02.png',
      answerImgAlt: 'b. 사과',
    },
    {
      answerImgSrc: '/L04/C03/A10/EE4-L04-C03-A10-P01-03.png',
      answerImgAlt: 'c. 헬멧',
    },
  ],
};

const P01 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Mission 3_Quiz 2' },
        hQuestionInfo: { text: '잘 듣고, 알파벳 e 소리가 들어간 낱말을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L04/C04/A10/EE4-L04-C04-A10-P01.mp3', captionSrc: '/L04/C04/A10/EE4-L04-C04-A10-P01.srt' },
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
