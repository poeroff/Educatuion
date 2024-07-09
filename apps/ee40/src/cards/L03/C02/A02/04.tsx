import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L03/C02/A02/EE4-L03-C02-A02-P04.mp4',
};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',
  answerText: [
    { title: '수호의 친구', value: 1 },
    { title: '수호의 여동생', value: 2 },
  ],
};

const P04 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 보고, 지민이는 누구인지 골라 봅시다.' },
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
