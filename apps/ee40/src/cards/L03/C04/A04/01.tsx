import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L03/C04/A04/EE4-L03-C04-A04-P01-01.png',
      answerImgAlt: '놀이터에서 여자아이가 자신의 볼을 손가락으로 찌르며 사진을 찍는 포즈를 취하는 모습',
    },
    {
      answerImgSrc: '/L03/C04/A04/EE4-L03-C04-A04-P01-02.png',
      answerImgAlt: '놀이터에서 남자아이가 양손으로 브이를 하며 사진을 찍는 포즈를 취하는 모습',
    },
  ],
};

const P01 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Review 1' },
        hQuestionInfo: { text: '1. 잘 듣고, 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L03/C04/A04/EE4-L03-C04-A04-P01.mp3', captionSrc: '/L03/C04/A04/EE4-L03-C04-A04-P01.srt' },
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
