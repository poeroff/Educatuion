import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L07/C02/A02/EE4-L07-C02-A02-P04.mp4',

  // qusetionVideoSrt: '/L07/C02/A02/EE4-L07-C02-A02-P04.srt',
};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',
  answerText: [
    { title: '8:30', value: 1 },
    { title: '10:30', value: 2 },
  ],
};

const P04 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 보고, 엘라가 몇 시라고 말 했는지 골라 봅시다.' },
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
