import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L08/C01/A05/EE4-L08-C01-A05-P03.mp4',
};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',
  answerText: [
    { title: '책', value: 1 },
    { title: '시계', value: 2 },
    { title: '우산', value: 3 },
  ],
};

const P03 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 1' },
        hQuestionInfo: { text: '영상을 보고, 카밀라가 고른 물건을 골라 봅시다.' },
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
