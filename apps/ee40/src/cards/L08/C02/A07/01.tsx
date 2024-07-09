import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L08/C02/A07/EE4-L08-C02-A07-P01-01.png',
      answerImgAlt: '손목시계',
    },
    {
      answerImgSrc: '/L08/C02/A07/EE4-L08-C02-A07-P01-02.png',
      answerImgAlt: '야구 방망이',
    },
    {
      answerImgSrc: '/L08/C02/A07/EE4-L08-C02-A07-P01-03.png',
      answerImgAlt: '장난감 배',
    },
  ],
};

const P01 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Mission 2_Quiz 1' },
        hQuestionInfo: { text: '잘 듣고, 여자아이가 원하는 물건을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L08/C02/A07/EE4-L08-C02-A07-P01.mp3', captionSrc: '/L08/C02/A07/EE4-L08-C02-A07-P01.srt' },
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
