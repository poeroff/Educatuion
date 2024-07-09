import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L12/C02/A02/EE4-L12-C02-A02-P03.mp4',
  // qusetionVideoSrt: '/L12/C02/A02/EE4-L12-C02-A02-P03.srt',
  qusetionVideoSrt: '',
};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    { answerImgSrc: '/L12/C02/A02/EE4-L12-C02-A02-P03-01.png', answerImgAlt: '공원에서 자전거를 타는 여자아이' },
    { answerImgSrc: '/L12/C02/A02/EE4-L12-C02-A02-P03-02.png', answerImgAlt: '공원에서 강아지와 산책하는 여자아이' },
  ],
};

const P03 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 보고, 올리가 주말에 무엇을 하는지 골라 봅시다.' },
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
