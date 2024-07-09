import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE10_L04_SP04_2_1 from './components/HE10_L04_SP04_2_1';

const P11 = () => {
  const pageNum = 'P11';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 영작 연습',
    headerPattern: 'text',
  };
  const question = '단어를 알맞게 배열하여 빈 칸에 들어갈 문장을 완성해봅시다.';
  const sentence = '우리의 여정은 의미 있었을 뿐만 아니라 즐거웠다.';
  const answer: string[] = ['Our journey was', 'not only', 'meaningful', 'but also', 'enjoyable'];

  const chipButtonInfo = [
    {
      text: answer[2],
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
    {
      text: answer[4],
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

export default P11;
