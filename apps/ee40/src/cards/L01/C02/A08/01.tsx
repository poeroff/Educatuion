import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import EEL01C01A05P04 from '@/Pages/EEL01C01A05P04';
import { TQuestionInfo, TAnswerInfo } from '@/types/contentInfo';
import styled from 'styled-components';

// TQuestionInfo 객체 생성
const questionInfo: TQuestionInfo<'img'> = {
  questionType: 'img',
  questionImgSrc: '/L01/C02/A08/EE4-L01-C02-A08-P01.webp',
  questionImgAlt: '해가 떠오르는 창 밖 풍경, 7시를 가리키는 시계, 그리고 여자아이',
};

const answerInfo: TAnswerInfo<'text'> = {
  answerType: 'text',
  answerText: [
    { title: 'O', value: 1 },
    { title: 'X', value: 2 },
  ],
};

const Text = styled.span`
  text-decoration: underline;
`;

const P01 = () => {
  return (
    <EEL01C01A05P04
      layout={{
        headerInfo: { headerText: 'Mission 2_Quiz 1' },
        hQuestionInfo: {
          text: (
            <span>
              잘 듣고, 그림과 내용이 일치하면 O, 일치하지 <Text>않으면</Text> X를 골라 봅시다.
            </span>
          ),
        },
        audioInfo: {
          audioSrc: '/L01/C02/A08/EE4-L01-C02-A08-P01.mp3',
          captionSrc: '/L01/C02/A08/EE4-L01-C01-A08-P01.srt',
        },
      }}
      pageData={{
        pageNumber: 1,
        mainKey: 1,
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
