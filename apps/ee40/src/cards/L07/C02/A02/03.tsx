import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL07C02A02P03 from '@/Pages/EEL07C02A02P03';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'video'> = {
  questionType: 'video',
  questionVideoSrc: '/L07/C02/A02/EE4-L07-C02-A02-P03.mp4',
  // qusetionVideoSrt: '/L07/C02/A02/EE4-L07-C02-A02-P03.srt',
  qusetionVideoSrt: '',
};

const answerInfo: TAnswerInfo<'img'> = {
  answerType: 'img',
  answerImg: [
    {
      answerImgSrc: '/L07/C02/A02/EE4-L07-C02-A02-P03-01.png',
      answerImgAlt: '접시에 빵과 달걀, 컵에 우유가 식탁 위에 놓여 있다. 배경에는 해가 떠오르는 창문과 산 풍경이 보인다. 시계는 7시를 가리키고 있다. ',
      text: 'breakfast',
    },
    {
      answerImgSrc: '/L07/C02/A02/EE4-L07-C02-A02-P03-02.png',
      answerImgAlt:
        '그릇에 담긴 식사가 테이블 위에 놓여 있다. 식사는 국, 밥, 반찬 등으로 구성되어 있다. 배경에는 햇살이 비추는 창문과 산 풍경이 보인다. 시계는 12시를 가리키고 있다.',
      text: 'lunch',
    },
    {
      answerImgSrc: '/L07/C02/A02/EE4-L07-C02-A02-P03-03.png',
      answerImgAlt:
        '그릇에 담긴 식사가 테이블 위에 놓여 있다. 식사는 국, 밥, 생선, 그리고 반찬 등으로 구성되어 있다. 배경에는 해가 지는 모습과 산 풍경이 보인다. 시계는 6시를 가리키고 있다.',
      text: 'dinner',
    },
  ],
};

const P03 = () => {
  return (
    <EEL07C02A02P03
      layout={{
        headerInfo: { headerText: 'Story 2' },
        hQuestionInfo: { text: '영상을 보고, 마이크가 피자를 먹고 있는 시간을 골라 봅시다.' },
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
