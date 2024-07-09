import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L09/C02/A02/EE4-L09-C02-A02-P04.mp4',
  // qusetionVideoSrt: '/L09/C02/A02/EE4-L09-C02-A02-P05.srt',
  qusetionVideoSrt: '',
};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    { answerImgSrc: '/L09/C02/A02/EE4-L09-C02-A02-P04-01.png', answerImgAlt: '공원에서 자전거를 타는 여자아이' },
    { answerImgSrc: '/L09/C02/A02/EE4-L09-C02-A02-P04-02.png', answerImgAlt: '공원에서 강아지와 산책하는 여자아이' },
  ],
};

const P04 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 다시 보고, 수호가 공연에서 할 수 있는 것을 골라 봅시다.' },
      }}
      pageData={{
        pageNumber: 4,
        mainKey: 4,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={{ questionInfo, answerInfo }}
    />
  );
};

export default P04;
