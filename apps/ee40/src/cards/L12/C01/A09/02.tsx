import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L12/C01/A09/EE4-L12-C01-A09-P02-01.png',
      answerImgAlt: '책을 읽고 있는 여자아이',
    },
    {
      answerImgSrc: '/L12/C01/A09/EE4-L12-C01-A09-P02-02.png',
      answerImgAlt: '헬멧을 쓰고 자전거를 타고 있는 여자아이',
    },
    {
      answerImgSrc: '/L12/C01/A09/EE4-L12-C01-A09-P02-03.png',
      answerImgAlt: '3D 안경을 끼고 팝콘을 먹으며 영화를 보고 있는 여자아이',
    },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Mission 1_Quiz 2' },
        hQuestionInfo: { text: '잘 듣고, 대화에 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L12/C01/A09/EE4-L12-C01-A09-P02.mp3', captionSrc: '/L12/C01/A09/EE4-L12-C01-A09-P02.srt' },
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
