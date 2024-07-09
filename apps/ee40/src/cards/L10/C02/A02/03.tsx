import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL04C02A02P04 from '@/Pages/EEL04C02A02P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L10/C02/A02/EE4-L10-C02-A02-P03.mp4',
  // qusetionVideoSrt: '/L10/C02/A02/EE4-L10-C02-A02-P03.srt',
  qusetionVideoSrt: '',
};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    { answerImgSrc: '/L10/C02/A02/EE4-L10-C02-A02-P03-01.png', answerImgAlt: '빨간색 스카프' },
    { answerImgSrc: '/L10/C02/A02/EE4-L10-C02-A02-P03-02.png', answerImgAlt: '분홍색 드레스' },
  ],
};

const P03 = () => {
  return (
    <EEL04C02A02P04
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 보고, 민지가 엘라에게 무엇을 찾아 주었는지 골라 봅시다.' },
      }}
      pageData={{
        pageNumber: 3,
        mainKey: 3,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={{ questionInfo, answerInfo }}
    />
  );
};

export default P03;
