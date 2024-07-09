import { getCorrectData, getDefaultData, getSolutionData } from '@/cards/L01/C01/A05/pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L01/C01/A05/EE4-L01-C01-A05-P04.mp4',
};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',
  answerText: [
    { title: '비가 오는데 우산이 없어서', value: 1 },
    { title: '날씨가 너무 더워서', value: 2 },
  ],
};

const P04 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 1' },
        hQuestionInfo: { text: '영상을 보고, 수호의 기분이 안 좋아진 이유를 찾아 봅시다.' },
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
