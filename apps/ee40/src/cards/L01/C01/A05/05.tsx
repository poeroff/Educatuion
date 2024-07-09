import { getCorrectData, getDefaultData, getSolutionData } from '@/cards/L01/C01/A05/pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L01/C01/A05/EE4-L01-C01-A05-P05.mp4',
  // qusetionVideoSrt: '/L01/C01/A05/EE4-L01-C01-A05-P05.srt',
  qusetionVideoSrt: '',
};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    { answerImgSrc: '/L01/C01/A05/EE4-L01-C01-A05-P05-01.png', answerImgAlt: '선풍기' },
    { answerImgSrc: '/L01/C01/A05/EE4-L01-C01-A05-P05-02.png', answerImgAlt: '우산' },
  ],
};

const P05 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 1' },
        hQuestionInfo: { text: '영상을 보고, 올리가 가지고 온 것을 골라 봅시다.' },
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
