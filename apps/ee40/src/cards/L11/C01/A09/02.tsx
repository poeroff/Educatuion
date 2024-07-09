import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL03C04A04P01 from '@/Pages/EEL03C04A04P01';
import { TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
// const questionInfo: TQuestionInfo<'video'> = {};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',

  answerText: [
    { title: '월요일(Monday)', value: 1 },
    { title: '화요일(Tuesday)', value: 2 },
    { title: '수요일(Wednesday)', value: 3 },
  ],
};

const P02 = () => {
  return (
    <EEL03C04A04P01
      layout={{
        headerInfo: { headerText: 'Mission 1_Quiz 2' },
        hQuestionInfo: { text: '잘 듣고, 알맞은 요일을 골라 봅시다.' },
        audioInfo: { audioSrc: '/L11/C01/A09/EE4-L11-C01-A09-P02.mp3', captionSrc: '/L11/C01/A09/EE4-L11-C01-A09-P02.srt' },
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
