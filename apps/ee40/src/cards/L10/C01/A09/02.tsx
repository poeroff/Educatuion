import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L10/C01/A09/EE4-L10-C01-A09-P02-01.png',
      answerImgAlt: '가방을 들고 있는 남자아이와 손으로 X 표시를 하고 고개를 젓고 있는 여자아이',
    },
    {
      answerImgSrc: '/L10/C01/A09/EE4-L10-C01-A09-P02-02.png',
      answerImgAlt: '모자를 들고 있는 남자아이와 웃으며 고개를 끄덕이고 있는 여자아이',
    },
    {
      answerImgSrc: '/L10/C01/A09/EE4-L10-C01-A09-P02-03.png',
      answerImgAlt: '스카프를 들고 있는 남자아이와 손으로 X 표시를 하고 고개를 젓고 있는 여자아이',
    },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Mission 1_Quiz 2' },
        hQuestionInfo: { text: '잘 듣고, 대화에 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L10/C01/A09/EE4-L10-C01-A09-P02.mp3', captionSrc: '/L10/C01/A09/EE4-L10-C01-A09-P02.srt' },
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
