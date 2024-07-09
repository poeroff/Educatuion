import { getCorrectData, getDefaultData, getSolutionData } from '@/cards/L01/C01/A05/pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L08/C02/A02/EE4-L08-C02-A02-P04.mp4',
  // qusetionVideoSrt: '/L08/C02/A02/EE4-L08-C02-A02-P04.srt',
  qusetionVideoSrt: '',
};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    { answerImgSrc: '/L08/C02/A02/EE4-L08-C02-A02-P04-01.png', answerImgAlt: '장난감 자동차' },
    { answerImgSrc: '/L08/C02/A02/EE4-L08-C02-A02-P04-02.png', answerImgAlt: '야구 글러브' },
  ],
};

const P04 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 보고, 손녀가 갖고 싶어 하는 것이 무엇인지 골라 봅시다.' },
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
