import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE10_L04_SP04_2_1 from './components/HE10_L04_SP04_2_1';

const P12 = () => {
  const pageNum = 'P12';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 영작 연습',
    headerPattern: 'text',
  };
  const question = '단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해봅시다.';
  const sentence = '중요한 것은 다른 사람들의 의견이 아니라 네 관점이다.';
  const answer: string[] = ['What matters is', 'not', 'others’ opinion', 'but', 'your perspective'];

  const chipButtonInfo = [
    {
      text: answer[2],
    },
    {
      text: answer[4],
    },
    {
      text: answer[1],
    },
    {
      text: answer[3],
    },
    {
      text: answer[0],
    },
  ];

  return (
    <HE10_L04_SP04_2_1
      pageNum={pageNum}
      answer={answer}
      sentence={sentence}
      chipButtonTexts={chipButtonInfo}
      headerInfo={headerInfo}
      question={question}
    />
  );
};

export default P12;
