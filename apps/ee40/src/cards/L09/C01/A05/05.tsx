import { getCorrectData, getDefaultData, getSolutionData } from '@/cards/L01/C01/A05/pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L09/C01/A05/EE4-L09-C01-A05-P05.mp4',
  questionVideoSrt: '/L09/C01/A05/EE4-L09-C01-A05-P05.mp4',
};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',
  answerText: [
    { title: '상자 옆에 있었어요.', value: 1 },
    { title: '상자 위에 있었어요.', value: 2 },
    { title: '상자 안에 있었어요.', value: 3 },
  ],
};

const P05 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 1' },
        hQuestionInfo: { text: '영상을 보고, 잭의 공이 어디에 있었는지 골라 봅시다.' },
      }}
      pageData={{
        pageNumber: 5,
        mainKey: 5,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={{ questionInfo, answerInfo }}
    />
  );
};

export default P05;
