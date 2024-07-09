import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL04C02A02P04 from '@/Pages/EEL04C02A02P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L04/C02/A02/EE4-L04-C02-A02-P04.mp4',
  // qusetionVideoSrt: '/L04/C02/A02/EE4-L04-C02-A02-P04.srt',
  qusetionVideoSrt: '',
};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    { answerImgSrc: '/L04/C02/A02/EE4-L04-C02-A02-P04-01.png', answerImgAlt: '남자아이가 아이스크림을 먹고 있다', text: 'eat' },
    { answerImgSrc: '/L04/C02/A02/EE4-L04-C02-A02-P04-02.png', answerImgAlt: '남자가 문으로 들어가고 있다', text: 'enter' },
  ],
};

const P04 = () => {
  return (
    <EEL04C02A02P04
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 보고, 수호가 올리에게 무엇을 하지 말라고 했는지 골라 보세요.' },
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
