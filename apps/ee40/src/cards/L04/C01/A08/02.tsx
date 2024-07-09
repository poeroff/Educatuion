import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L04/C01/A08/EE4-L04-C01-A08-P02-01.png',
      answerImgAlt: '전시회에서 무언가를 설명하는 선생님과 그 설명을 듣고 있는 아이들',
    },
    {
      answerImgSrc: '/L04/C01/A08/EE4-L04-C01-A08-P02-02.png',
      answerImgAlt: '칠판 앞에서 무언가를 설명하는 선생님과 자리에 앉아 그 설명을 듣고 있는 남자아이',
    },
    {
      answerImgSrc: '/L04/C01/A08/EE4-L04-C01-A08-P02-03.png',
      answerImgAlt: '복도에서 여자아이를 민 남자아이와 그 아이에게 주의를 주고 있는 선생님',
    },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Mission 1_Quiz 2' },
        hQuestionInfo: { text: '잘 듣고, 내용에 알맞은 그림을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L04/C04/A08/EE4-L04-C04-A08-P02.mp3', captionSrc: '/L04/C04/A08/EE4-L04-C04-A08-P02.srt' },
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
