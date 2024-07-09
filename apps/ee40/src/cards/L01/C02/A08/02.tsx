import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'img'> = {
  questionType: 'img',
  questionImgSrc: '/L01/C02/A08/EE4-L01-C02-A08-P02.webp',
  questionImgAlt: '해가 떠오르는 창 밖 풍경, 7시를 가리키는 시계, 그리고 여자아이',
};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',
  answerText: [
    { title: 'a', value: 1 },
    { title: 'b', value: 2 },
    { title: 'c', value: 3 },
  ],
};

const P01 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Mission 2_Quiz 2' },
        hQuestionInfo: {
          text: '잘 듣고, 남자아이가 할 말로 알맞은 것을 골라 봅시다.',
        },
        audioInfo: {
          audioSrc: '/L01/C02/A08/EE4-L01-C02-A08-P02.mp3',
          captionSrc: '/L01/C02/A08/EE4-L01-C01-A08-P02.srt',
        },
      }}
      pageData={{
        pageNumber: 2,
        mainKey: 2,
        subKey: 'NUMBER-01',
        getDefaultData,
        getCorrectData,
        getSolutionData,
      }}
      contentInfo={{ questionInfo, answerInfo }}
    />
  );
};

export default P01;
