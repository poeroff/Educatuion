import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L02/C02/A02/EE4-L02-C02-A02-P03.mp4',
};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',
  answerText: [
    { title: '운동장', value: 1 },
    { title: '교실', value: 2 },
  ],
};

const P04 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 보고, 엘라와 카밀라가 다시 만난 장소를 골라 봅시다.' },
      }}
      pageData={{
        pageNumber: 4,
        mainKey: 2,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData
      }}
      contentInfo={{ questionInfo, answerInfo }}
    />
  );
};

export default P04;